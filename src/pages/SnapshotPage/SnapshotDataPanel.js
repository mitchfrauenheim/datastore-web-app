import React from "react";
import SnapshotDataTable from "./SnapshotDataTable";

export default function SnapshotDataPanel({
                                              snapshotDataPage,
                                              errorMsg,
                                              handlePreviousPageFunction,
                                              handleNextPageFunction }) {

    function renderQueryResultsPanel() {
        return (
            <div>
                <div>
                    <button onClick={handlePreviousPageFunction}>Previous Page</button>
                    <button onClick={handleNextPageFunction}>Next Page</button>
                </div>
                <div>
                    <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                        <SnapshotDataTable snapshotDataPage={snapshotDataPage}/>
                    </div>
                </div>
            </div>
        );
    }

    function renderNoResultsPanel() {
        return (
            <div/>
        );
    }

    function renderQueryErrorPanel() {
        return (
            <div>
                <h1>{errorMsg}</h1>
            </div>
        );
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            {(errorMsg !== null) ? renderQueryErrorPanel() : (snapshotDataPage !== null)
                ? renderQueryResultsPanel() : renderNoResultsPanel() }
        </div>
    );
}
