import React from "react";
import SnapshotDataTable from "./SnapshotDataTable";

export default function SnapshotDataPanel({ snapshotDataPage, errorMsg }) {

    function renderQueryResultsPanel() {
        return (
            <div>
                <div>
                    <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                        <SnapshotDataTable snapshotDataPage={snapshotDataPage}/>
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
