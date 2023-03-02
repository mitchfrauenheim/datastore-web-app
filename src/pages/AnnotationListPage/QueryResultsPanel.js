import React from "react";
import AnnotationListTable from "./AnnotationListTable";

export default function QueryResultsPanel({ annotationList, errorMsg }) {

    function renderDataTable() {
        return (
            <AnnotationListTable annotationList={annotationList} />
        );
    }

    function renderNoDataTable() {
        return (
            <div />
        );
    }

    function renderQueryResultsPanel() {
        return (
            (annotationList.length === 0) ? renderNoDataTable() : renderDataTable()
        )

    }

    function renderQueryErrorPanel() {
        alert(errorMsg)
        return (
            <div />
        );
    }

    return (
        (errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()
    );
}
