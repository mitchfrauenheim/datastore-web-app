import PvListTable from "./PvListTable";
import React from "react";

export default function QueryResultsPanel({ pvs, errorMsg }) {

    function renderPvListDataTable() {
        return (
            <PvListTable pvs={pvs} />
        );
    }

    function renderNoPvListDataTable() {
        return (
            <div />
        );
    }

    function renderQueryResultsPanel() {
        return (
            (pvs.length === 0) ? renderNoPvListDataTable() : renderPvListDataTable()
        );
    }

    function renderQueryErrorPanel() {
        return (
            <div>
                <h1>{errorMsg}</h1>;
            </div>
        );
    }

    return (
        (errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()
    );
}
