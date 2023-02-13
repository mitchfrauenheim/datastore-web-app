import React from "react";
import SnapshotListTable from "./SnapshotListTable";

export default function QueryResultsPanel({ snapshots, errorMsg }) {

    let snapshotMetadataList = snapshots;

    function renderSnapshotListDataTable() {
        return (
            <div>
                <SnapshotListTable snapshots={snapshots} />
            </div>
        );
    }

    function renderNoSnapshotListDataTable() {
        return (
            <div />
        );
    }

    function renderQueryResultsPanel() {
        return (
            <div>
                {(snapshots.length === 0) ? renderNoSnapshotListDataTable() : renderSnapshotListDataTable()}
            </div>
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
        <div>
            {(errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()}
        </div>
    );
}
