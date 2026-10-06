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
import { SelectionUi } from "./selection_ui";

const connector: DataConnectorIntent = {
  async getDataTable(request): Promise<GetDataTableResponse> {
    try {
      const ref = decodeDataRef(request.dataSourceRef.source);
      const token = await getGoogleAccessToken();

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

      const rows = result.rows ?? [];
      const empty = rows.length === 0;

      return {
        status: "completed",
        dataTable: buildGscDataTable(
          ref.dataset,
          rows.slice(0, reportLimit),
        ),
        metadata: {
          description: empty
            ? `No Search Console rows yet for ${datasetLabel(ref.dataset)} in this rolling period.`
            : `${datasetLabel(ref.dataset)} from Google Search Console.`,
          providerInfo: { name: "Google Search Console" },
        },
      };
    } catch (error) {
      return toGetDataTableError(error);
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
