import PvListTable from "./PvListTable";
import React from "react";
import ErrorMessage from "../../components/ErrorMessage";

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
            <ErrorMessage errorMsg={errorMsg} />
        );
    }

    return (
        (errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()
    );
}
