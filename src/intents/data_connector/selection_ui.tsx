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

const datasetOptions = [
  { value: "top_queries", label: "Top Queries" },
  { value: "top_pages", label: "Top Pages" },
  { value: "trend", label: "Trend" },
];

const dateOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

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
  const [error, setError] = useState<string | null>(null);

  async function loadProperties(forceRefresh = false) {
    setLoading(true);
    setError(null);

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
      setProperty((current) => current || next[0]?.siteUrl || "");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not load Search Console properties.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProperties();
  }, []);

  async function reconnectGoogle() {
    setLoading(true);
    setError(null);

    try {
      await disconnectGoogle();
      setAuthorized(false);
      setProperties([]);
      setProperty("");

      const result = await authorizeGoogle();
      if (result.status === "completed") {
        await loadProperties(true);
      } else {
        setLoading(false);
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not reconnect Google.",
      );
      setLoading(false);
    }
  }

  async function connectGoogle() {
    setLoading(true);
    setError(null);

    try {
      const result = await authorizeGoogle();

      if (result.status === "completed") {
        await loadProperties();
      } else {
        setLoading(false);
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Google connection failed.",
      );
      setLoading(false);
    }
  }

  async function importData() {
    const datasetTitle =
      dataset === "top_queries"
        ? "Top Queries"
        : dataset === "top_pages"
          ? "Top Pages"
          : "Search Trend";

    const result = await request.updateDataRef({
      source: encodeDataRef({
        v: 1,
        property,
        dataset,
        dateRange,
        searchType: "web",
      }),
      title: datasetTitle + " · " + property,
    });

    if (
      result.status === "app_error" ||
      result.status === "remote_request_failed"
    ) {
      setError(
        result.status === "app_error"
          ? result.message || "Could not preview this report."
          : "Could not reach Google Search Console.",
      );
    } else {
      setError(null);
    }
  }

  if (loading) {
    return <Text>Loading Search Console…</Text>;
  }

  if (!authorized) {
    return (
      <Rows spacing="2u">
        <Text>
          Connect Google to choose a Search Console property. This app requests
          read-only Search Console access.
        </Text>
        <Button variant="primary" onClick={connectGoogle}>
          Connect Google
        </Button>
        {error ? <Text>{error}</Text> : null}
      </Rows>
    );
  }

  if (authorized && properties.length === 0) {
    return (
      <Rows spacing="2u">
        <Text>
          Google is connected, but Search Console returned no properties for
          this account.
        </Text>
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
        {error ? <Text>{error}</Text> : null}
      </Rows>
    );
  }

  return (
    <Rows spacing="2u">
      <Text>
        Choose the Search Console data you want to use in Canva. Query and page
        reports contain Google&apos;s top rows for the selected period.
      </Text>

      <FormField
        label="Property"
        value={property}
        control={(props) => (
          <Select
            {...props}
            options={properties.map((item) => ({
              value: item.siteUrl,
              label: item.siteUrl,
            }))}
            onChange={setProperty}
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
            options={datasetOptions}
            onChange={(value) => setDataset(value as DatasetKind)}
          />
        )}
      />

      <FormField
        label="Date range"
        value={dateRange}
        control={(props) => (
          <Select
            {...props}
            options={dateOptions}
            onChange={(value) => setDateRange(value as DateRangePreset)}
          />
        )}
      />

      <Button
        variant="primary"
        disabled={!property}
        onClick={importData}
      >
        Import data
      </Button>

      {error ? <Text>{error}</Text> : null}
    </Rows>
  );
}
