import {epochSecondsToLocaleString} from "../../domain/utils/timestamp";
import React from "react";

export default function SnapshotDetailsPanel({ snapshotId, firstSeconds, lastSeconds }) {

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Snapshot Details</h1>
            <p>Snapshot ID: {snapshotId}</p>
            <p>First Sample Time: {epochSecondsToLocaleString(firstSeconds)}</p>
            <p>Last Sample Time: {epochSecondsToLocaleString(lastSeconds)}</p>
        </div>
    );

}
