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
                    <div>
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
        <div>
            {(errorMsg !== null) ? renderQueryErrorPanel() : (snapshotDataPage !== null)
                ? renderQueryResultsPanel() : renderNoResultsPanel() }
        </div>
    );
}
