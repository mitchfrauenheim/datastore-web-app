import React from "react";
import SnapshotListTable from "./SnapshotListTable";
import ErrorMessage from "../../components/ErrorMessage";

export default function QueryResultsPanel({ snapshots, errorMsg }) {

    let snapshotMetadataList = snapshots;

    function renderSnapshotListDataTable() {
        return (
            <SnapshotListTable snapshots={snapshots} />
        );
    }

    function renderNoSnapshotListDataTable() {
        return (
            <div />
        );
    }

    function renderQueryResultsPanel() {
        return (
            (snapshots.length === 0) ? renderNoSnapshotListDataTable() : renderSnapshotListDataTable()
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
