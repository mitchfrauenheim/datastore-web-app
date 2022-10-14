import React from "react";
import SnapshotListTable from "./SnapshotListTable";

export default function QueryResultsPanel({snapshots, errorMsg}) {

    let snapshotMetadataList = snapshots;

    function renderSnapshotListDataTable() {
        return (
            <div>
                <SnapshotListTable snapshots={snapshots}/>
            </div>
        );
    }

    function renderNoSnapshotListDataTable() {
        return (
            <div/>
        );
    }

    function renderQueryResultsPanel() {
        return (
            <div>
                <div>
                    <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                        {(snapshots.length === 0) ? renderNoSnapshotListDataTable() : renderSnapshotListDataTable()}
                    </div>
                </div>
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
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            {(errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()}
        </div>
    );
}
