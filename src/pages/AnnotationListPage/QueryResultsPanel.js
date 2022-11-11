import React from "react";
import AnnotationListTable from "./AnnotationListTable";

export default function QueryResultsPanel({annotationList, errorMsg}) {

    function renderDataTable() {
        return (
            <div>
                <AnnotationListTable annotationList={annotationList}/>
            </div>
        );
    }

    function renderNoDataTable() {
        return (
            <div/>
        );
    }

    function renderQueryResultsPanel() {
        return (
            <div>
                <div>
                    <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                        {(annotationList.length === 0) ? renderNoDataTable() : renderDataTable()}
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
