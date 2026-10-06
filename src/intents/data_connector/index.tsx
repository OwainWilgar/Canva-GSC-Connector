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
import {
  buildGscDataTable,
  buildRefreshProofRows,
} from "../../gsc/data_table";
import { decodeDataRef } from "../../gsc/data_ref";
import { GscError } from "../../gsc/errors";
import { buildSearchAnalyticsRequest } from "../../gsc/query";
import { SelectionUi } from "./selection_ui";

const connector: DataConnectorIntent = {
  async getDataTable(request): Promise<GetDataTableResponse> {
    try {
      const ref = decodeDataRef(request.dataSourceRef.source);

      if (ref.dataset === "proof_fixture") {
        return {
          status: "completed",
          dataTable: buildGscDataTable(
            ref.dataset,
            buildRefreshProofRows(),
          ),
        };
      }

      const token = await getGoogleAccessToken();

      if (!token?.token) {
        return {
          status: "app_error",
          message: "Connect Google before importing Search Console data.",
        };
      }

      const availableRows = request.limit.row - 1;
      if (availableRows < 1) {
        return {
          status: "app_error",
          message:
            "This Canva surface does not have enough rows available for this report.",
        };
      }

      const reportLimit = Math.min(1_000, availableRows);
      const query = buildSearchAnalyticsRequest(ref, reportLimit);
      const result = await querySearchAnalytics(
        token.token,
        ref.property,
        query,
        request.signal,
      );

      const rows = result.rows ?? [];

      return {
        status: "completed",
        dataTable: buildGscDataTable(
          ref.dataset,
          rows.slice(0, reportLimit),
        ),
      };
    } catch (error) {
      const message =
        error instanceof GscError || error instanceof Error
          ? error.message
          : "Search Console request failed.";

      return { status: "app_error", message };
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
