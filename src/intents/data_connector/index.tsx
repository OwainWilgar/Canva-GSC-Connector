import "@canva/app-ui-kit/styles.css";
import { AppI18nProvider } from "@canva/app-i18n-kit";
import { AppUiProvider } from "@canva/app-ui-kit";
import type {
  DataConnectorIntent,
  GetDataTableResponse,
} from "@canva/intents/data";
import { createRoot } from "react-dom/client";
import { getGoogleAccessToken } from "../../auth/google";
import { querySearchAnalytics } from "../../gsc/client";
import { toGetDataTableError } from "../../gsc/connector_errors";
import { buildGscDataTable } from "../../gsc/data_table";
import { decodeDataRef } from "../../gsc/data_ref";
import { resolveReportRowLimit } from "../../gsc/limits";
import { datasetLabel } from "../../gsc/presentation";
import { buildSearchAnalyticsRequest } from "../../gsc/query";
import { traceDiagnostic } from "../../gsc/diagnostics";
import { SelectionUi } from "./selection_ui";

const connector: DataConnectorIntent = {
  async getDataTable(request): Promise<GetDataTableResponse> {
    const startedAt = Date.now();

    traceDiagnostic("getDataTable start", {
      limit: request.limit,
      aborted: request.signal.aborted,
    });

    request.signal.addEventListener(
      "abort",
      () => {
        traceDiagnostic("getDataTable aborted", {
          elapsedMs: Date.now() - startedAt,
        });
      },
      { once: true },
    );

    try {
      const ref = decodeDataRef(request.dataSourceRef.source);
      const token = await getGoogleAccessToken();

      traceDiagnostic("access token ready", {
        elapsedMs: Date.now() - startedAt,
        aborted: request.signal.aborted,
      });

      if (!token?.token) {
        return { status: "outdated_source_ref" };
      }

      const reportLimit = resolveReportRowLimit(request.limit);
      const query = buildSearchAnalyticsRequest(ref, reportLimit);
      const result = await querySearchAnalytics(
        token.token,
        ref.property,
        query,
        request.signal,
      );

      traceDiagnostic("Search Analytics complete", {
        elapsedMs: Date.now() - startedAt,
        aborted: request.signal.aborted,
      });

      const rows = result.rows ?? [];
      const empty = rows.length === 0;
      const dataTable = buildGscDataTable(
        ref.dataset,
        rows.slice(0, reportLimit),
      );

      traceDiagnostic("data table summary", {
        dataset: ref.dataset,
        rows: dataTable.rows.length,
        columns: dataTable.columnConfigs?.length ?? 0,
        limit: request.limit,
        elapsedMs: Date.now() - startedAt,
        aborted: request.signal.aborted,
      });

      return {
        status: "completed",
        dataTable,
        metadata: {
          description: empty
            ? `No Search Console rows yet for ${datasetLabel(ref.dataset)} in this rolling period.`
            : `${datasetLabel(ref.dataset)} from Google Search Console.`,
          providerInfo: { name: "Google Search Console" },
        },
      };
    } catch (error) {
      const response = toGetDataTableError(error);
      traceDiagnostic("getDataTable failed", {
        status: response.status,
        elapsedMs: Date.now() - startedAt,
        aborted: request.signal.aborted,
        errorName:
          error instanceof Error ? error.name : typeof error,
        errorMessage:
          error instanceof Error ? error.message : undefined,
      });
      return response;
    }
  },

  renderSelectionUi(request) {
    const root = createRoot(document.getElementById("root") as Element);
    root.render(
      <AppI18nProvider>
        <AppUiProvider>
          <SelectionUi request={request} />
        </AppUiProvider>
      </AppI18nProvider>,
    );
  },
};

export default connector;
