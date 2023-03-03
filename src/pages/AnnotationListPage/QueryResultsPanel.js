import React from "react";
import AnnotationListTable from "./AnnotationListTable";
import ErrorMessage from "../../components/ErrorMessage";

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
        return (
            <ErrorMessage errorMsg={errorMsg} />
        );
    }

    return (
        (errorMsg !== null) ? renderQueryErrorPanel() : renderQueryResultsPanel()
    );
}
