import React from "react";
import SnapshotMetadataTable from "./SnapshotMetadataTable";

export default function QueryResultsPanel({snapshots}) {

    let snapshotMetadataList = snapshots;

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
