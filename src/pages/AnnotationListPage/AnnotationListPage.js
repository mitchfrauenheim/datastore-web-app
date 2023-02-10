import React, { useEffect, useState } from "react";
import QueryFilter from "../../domain/filter/QueryFilter";
import { useSearchParams } from "react-router-dom";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

export default function AnnotationListPage({ client }) {

    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [annotationList, setAnnotationList] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();

    let handledParams = false;

    useEffect(() => {
        console.log("AnnotationListPage.useEffect()");
        if (handledParams) return;
        handledParams = true;
        console.log("handling URL parameters");
        applyUrlParams();
    }, [searchParams]);

    function applyUrlParams() {
        console.log("AnnotationListPage.applyUrlParams()");
        filter.initFromUrlParams(searchParams);
        setFilterCriteria(filter.criteriaList);
        if (filter.criteriaList.length > 0) {
            getAnnotationList();
        } else {
            setAnnotationList([]);
        }
    }

    function updateCriteria() {
        console.log("AnnotationListPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleDeleteCriteria(criteria) {
        console.log("AnnotationListPage.handleDeleteCriteria(): " + criteria.displayString);
        filter.deleteCriteria(criteria);
        updateCriteria();
    }

    function handleSubmit() {
        console.log("AnnotationListPage.handleSubmit()");
        setQueryErrorMsg(null);
        setSearchParams(filter.urlParams);
    }

    function handleReset() {
        console.log("AnnotationListPage.handleReset()");
        filter.reset();
        setSearchParams({});
        setFilterCriteria([]);
        setAnnotationList([]);
        setQueryErrorMsg(null);
    }

    function handleQueryResult(resultList) {
        console.log("AnnotationListPage.handleQueryResult()");
        setAnnotationList(resultList);
    }

    function handleQueryNoResult(errorMsg) {
        console.log("AnnotationListPage.handleQueryNoResult()");
        setQueryErrorMsg(errorMsg);
    }

    function handleQueryError(errorMsg) {
        console.log("AnnotationListPage.handleQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getAnnotationList() {
        console.log("AnnotationListPage.getAnnotationList()");
        client.queryListAnnotationsUsingFilter(
            filter, handleQueryResult, handleQueryNoResult, handleQueryError);
    }

    return (
        <div id="annotations-list-wrapper" className="page-wrapper">
            <div id="annotations-list-breadcrumbs" className="custom-breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>Annotation List Filter</li>
                </ul>
            </div>
            <div id="annotations-list-content" className="page-content">
                <div id="annotations-list-title-wrapper">
                    <PageTitle pageName="Annotation List Filter" />
                </div>
                <div id="annotations-list-filter-wrapper" className="page-filter-wrapper">
                    <div id="annotations-list-edit-panel" className="px-8 pb-4">
                        <FilterEditPanel filter={filter}
                            updateCriteriaFunction={updateCriteria}
                            handleResetFunction={handleReset} />
                    </div>
                    <div className="mb-4 border-b border-gray-300"></div>
                    <div id="pv-list-criteria-panel" className="px-8">
                        <FilterCriteriaPanel
                            criteriaList={filterCriteria}
                            handleSubmitFunction={handleSubmit}
                            handleResetFunction={handleReset}
                            handleDeleteCriteriaFunction={handleDeleteCriteria}
                            heading="Annotation List Filter Criteria"
                            beginPrompt="To begin, add criteria to Annotation list filter." />
                    </div>
                </div>
                <QueryResultsPanel annotationList={annotationList} errorMsg={queryErrorMsg} />
            </div>
        </div>
    );

}
