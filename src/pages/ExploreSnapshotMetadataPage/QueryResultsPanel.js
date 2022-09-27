import React from "react";
import SnapshotMetadataTable from "./SnapshotMetadataTable";

export default function QueryResultsPanel({snapshots, errorMsg}) {

    let snapshotMetadataList = snapshots;

    function renderQueryResultsPanel() {
        return (
            <div>
                <div>
                    <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                        <SnapshotMetadataTable snapshots={snapshots}/>
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
