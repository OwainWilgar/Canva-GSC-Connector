import {
  Button,
  FormField,
  Rows,
  Select,
  Text,
} from "@canva/app-ui-kit";
import type { RenderSelectionUiRequest } from "@canva/intents/data";
import { useEffect, useMemo, useState } from "react";
import {
  authorizeGoogle,
  disconnectGoogle,
  getGoogleAccessToken,
} from "../../auth/google";
import {
  listProperties,
  type GscProperty,
} from "../../gsc/client";
import {
  decodeDataRef,
  encodeDataRef,
  type DatasetKind,
  type DateRangePreset,
} from "../../gsc/data_ref";
import {
  REQUIRED_COLUMN_COUNT,
  DEFAULT_REPORT_ROW_LIMIT,
} from "../../gsc/limits";
import {
  DATASET_OPTIONS,
  DATE_RANGE_OPTIONS,
  dataSourceTitle,
  datasetDescription,
  dateRangeDescription,
  propertyLabel,
} from "../../gsc/presentation";
import { GscError } from "../../gsc/errors";

function selectionErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof GscError) return error.message;
  return fallback;
}

export function SelectionUi({
  request,
}: {
  request: RenderSelectionUiRequest;
}) {
  const restored = useMemo(() => {
    const source = request.invocationContext.dataSourceRef?.source;
    if (!source) return undefined;

    try {
      return decodeDataRef(source);
    } catch {
      return undefined;
    }
  }, [request.invocationContext.dataSourceRef?.source]);

  const contextMessage = useMemo(() => {
    if (request.invocationContext.reason === "outdated_source_ref") {
      return "This saved Search Console selection needs to be connected again. Choose a property and update the data source.";
    }

    if (request.invocationContext.reason === "app_error") {
      return (
        request.invocationContext.message ||
        "This saved Search Console report needs attention before it can refresh."
      );
    }

    return null;
  }, [request.invocationContext]);

  const isEditing = Boolean(request.invocationContext.dataSourceRef);
  const [properties, setProperties] = useState<GscProperty[]>([]);
  const [property, setProperty] = useState(restored?.property ?? "");
  const [dataset, setDataset] = useState<DatasetKind>(
    restored?.dataset ?? "top_queries",
  );
  const [dateRange, setDateRange] = useState<DateRangePreset>(
    restored?.dateRange ?? "last_28_days",
  );
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [notice, setNotice] = useState<string | null>(contextMessage);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const maxReportRows = Math.min(
    DEFAULT_REPORT_ROW_LIMIT,
    request.limit.row,
  );
  const surfaceTooNarrow =
    request.limit.column < REQUIRED_COLUMN_COUNT || request.limit.row < 1;

  async function loadProperties(forceRefresh = false) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = await getGoogleAccessToken(forceRefresh);

      if (!token?.token) {
        setAuthorized(false);
        setProperties([]);
        return;
      }

      setAuthorized(true);
      const next = await listProperties(token.token);
      setProperties(next);
      setProperty((current) => {
        if (current && next.some((item) => item.siteUrl === current)) {
          return current;
        }
        return next[0]?.siteUrl ?? "";
      });
    } catch (caught) {
      setProperties([]);
      setProperty("");

      if (
        caught instanceof GscError &&
        (caught.code === "AUTH_REQUIRED" || caught.code === "AUTH_REVOKED")
      ) {
        setAuthorized(false);
      }

      setError(
        selectionErrorMessage(
          caught,
          "Could not reach Google Search Console. Try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProperties();
  }, []);

  function clearFeedback() {
    setNotice(null);
    setError(null);
    setSuccess(null);
  }

  async function reconnectGoogle() {
    setLoading(true);
    clearFeedback();

    try {
      await disconnectGoogle();
      setAuthorized(false);
      setProperties([]);
      setProperty("");

      const result = await authorizeGoogle();
      if (result.status === "completed") {
        await loadProperties(true);
      } else {
        setError("Google connection was not completed. Try again.");
        setLoading(false);
      }
    } catch (caught) {
      setError(
        selectionErrorMessage(
          caught,
          "Could not reconnect Google. Try again.",
        ),
      );
      setLoading(false);
    }
  }

  async function connectGoogle() {
    setLoading(true);
    clearFeedback();

    try {
      const result = await authorizeGoogle();

      if (result.status === "completed") {
        await loadProperties(true);
      } else {
        setError("Google connection was not completed. Try again.");
        setLoading(false);
      }
    } catch (caught) {
      setError(
        selectionErrorMessage(
          caught,
          "Google connection failed. Try again.",
        ),
      );
      setLoading(false);
    }
  }

  async function importData() {
    clearFeedback();
    setImporting(true);

    try {
      const source = encodeDataRef({
        v: 1,
        property,
        dataset,
        dateRange,
        searchType: "web",
      });

      const result = await request.updateDataRef({
        source,
        title: dataSourceTitle(dataset, property),
      });

      if (result.status === "completed") {
        setSuccess(
          isEditing
            ? "Selection updated. Canva will use it on the next refresh."
            : "Data source linked. Canva can refresh this selection later.",
        );
        return;
      }

      if (result.status === "remote_request_failed") {
        setError(
          "Google Search Console could not be reached. Try again shortly.",
        );
        return;
      }

      if (result.status === "outdated_source_ref") {
        setError(
          "This saved selection needs to be connected again. Reconnect Google or choose the property again.",
        );
        return;
      }

      setError(
        result.message ||
          "Search Console could not prepare this report. Review the selection and try again.",
      );
    } catch {
      setError(
        "Could not save this Search Console selection in Canva. Try again.",
      );
    } finally {
      setImporting(false);
    }
  }

  if (loading) {
    return <Text>Loading Search Console properties…</Text>;
  }

  if (!authorized) {
    return (
      <Rows spacing="2u">
        <Text>
          Connect Google to import Search Console reporting data. Access is
          read-only; this app cannot change Search Console settings.
        </Text>
        {error ? <Text>{error}</Text> : null}
        <Button variant="primary" onClick={connectGoogle}>
          Connect Google
        </Button>
      </Rows>
    );
  }

  if (properties.length === 0) {
    return (
      <Rows spacing="2u">
        <Text>
          Google is connected, but this account has no Search Console
          properties available to import.
        </Text>
        {error ? <Text>{error}</Text> : null}
        <Button
          variant="primary"
          onClick={() => {
            void loadProperties(true);
          }}
        >
          Retry
        </Button>
        <Button variant="secondary" onClick={reconnectGoogle}>
          Switch Google account
        </Button>
      </Rows>
    );
  }

  return (
    <Rows spacing="2u">
      {notice ? <Text>{notice}</Text> : null}

      <Text>
        Import report-ready Search Console data. Query and page reports contain
        Google&apos;s top rows, not an exhaustive export.
      </Text>

      <FormField
        label="Property"
        value={property}
        control={(props) => (
          <Select
            {...props}
            options={properties.map((item) => ({
              value: item.siteUrl,
              label: propertyLabel(item.siteUrl),
            }))}
            onChange={(value) => {
              clearFeedback();
              setProperty(value);
            }}
            placeholder="Choose a property"
          />
        )}
      />

      <FormField
        label="Dataset"
        value={dataset}
        control={(props) => (
          <Select
            {...props}
            options={[...DATASET_OPTIONS]}
            onChange={(value) => {
              clearFeedback();
              setDataset(value as DatasetKind);
            }}
          />
        )}
      />
      <Text>{datasetDescription(dataset)}</Text>

      <FormField
        label="Date range"
        value={dateRange}
        control={(props) => (
          <Select
            {...props}
            options={[...DATE_RANGE_OPTIONS]}
            onChange={(value) => {
              clearFeedback();
              setDateRange(value as DateRangePreset);
            }}
          />
        )}
      />
      <Text>{dateRangeDescription(dateRange)}</Text>

      <Text>
        Canva will import up to {Math.max(0, maxReportRows)} data rows for this
        selection.
      </Text>

      {surfaceTooNarrow ? (
        <Text>
          This Canva surface is too small for the five-column Search Console
          report. Choose a sheet or another surface with more room.
        </Text>
      ) : null}

      <Button
        variant="primary"
        disabled={!property || importing || surfaceTooNarrow}
        loading={importing}
        onClick={importData}
      >
        {isEditing ? "Update data" : "Import data"}
      </Button>

      <Button
        variant="secondary"
        disabled={importing}
        onClick={reconnectGoogle}
      >
        Switch Google account
      </Button>

      {success ? <Text>{success}</Text> : null}
      {error ? <Text>{error}</Text> : null}
    </Rows>
  );
}
