import React from "react";
import SnapshotDataTable from "./SnapshotDataTable";

export default function SnapshotDataPanel({ snapshotDataPage }) {

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <SnapshotDataTable snapshotDataPage={snapshotDataPage}/>
        </div>
    );

}
