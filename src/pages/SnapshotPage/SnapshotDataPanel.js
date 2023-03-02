import React from "react";
import SnapshotDataTable from "./SnapshotDataTable";

export default function SnapshotDataPanel({
    snapshotDataPage,
    errorMsg,
    handlePreviousPageFunction,
    handleNextPageFunction }) {

    function renderQueryResultsPanel() {
        return (
            <>
                <div className="flex flex-row">
                    <button onClick={handlePreviousPageFunction} className="mr-2">Previous Page</button>
                    <button onClick={handleNextPageFunction}>Next Page</button>
                </div>
                <SnapshotDataTable snapshotDataPage={snapshotDataPage} />
            </>
        );
    }

    function renderNoResultsPanel() {
        return (
            <div />
        );
    }

    function renderQueryErrorPanel() {
        alert(errorMsg)
        return (
            <div />
        );
    }

    return (
        (errorMsg !== null) ? renderQueryErrorPanel() : (snapshotDataPage !== null)
            ? renderQueryResultsPanel() : renderNoResultsPanel()
    );
}
