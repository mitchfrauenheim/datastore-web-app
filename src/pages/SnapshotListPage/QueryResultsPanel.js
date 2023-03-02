import React from "react";
import SnapshotListTable from "./SnapshotListTable";

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
        alert(errorMsg)
        return (
            <div />
        );
    }

    return (
        (errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()
    );
}
