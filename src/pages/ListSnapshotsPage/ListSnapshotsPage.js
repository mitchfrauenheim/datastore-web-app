import React, {useEffect, useState} from "react";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import QueryFilter from "../../domain/filter/QueryFilter";
import {createSearchParams, useSearchParams} from "react-router-dom";
import FilterConstants from "../../domain/filter/FilterConstants";

export default function ListSnapshotsPage({client}) {

    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshotList, setSnapshotList] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();

    let handledParams = false;

    useEffect(() => {
        console.log("ListSnapshotsPage.useEffect()");
        // const currentSearchParams = Object.fromEntries([...searchParams]);
        // console.log(currentSearchParams);
        if (handledParams) return;
        handledParams = true;
        console.log("handling URL parameters");
        applyUrlParams();
    }, [searchParams]);

    function applyUrlParams() {
        console.log("ListSnapshotsPage.applyUrlParams()");
        filter.initFromUrlParams(searchParams);
        setFilterCriteria(filter.criteriaList);
        if (filter.criteriaList.length > 0) {
            getSnapshotList();
        }
     }

    function updateCriteria () {
        console.log("ListSnapshotsPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleDeleteCriteria(criteria) {
        console.log("ListSnapshotsPage.handleDeleteCriteria(): " + criteria.displayString);
        filter.deleteCriteria(criteria);
        updateCriteria();
    }

    function handleSubmit() {
        console.log("ListSnapshotsPage.handleSubmit()");
        setSearchParams(filter.urlParams);
    }

    function handleReset() {
        console.log("ListSnapshotsPage.handleReset()");
        setFilter(new QueryFilter());
        setFilterCriteria([]);
        setSnapshotList([]);
        setQueryErrorMsg(null);
        setSearchParams({});
    }

    function handleListSnapshotsQueryResult(resultList) {
        console.log("ListSnapshotsPage.handleListSnapshotsQueryResult()");
        setSnapshotList(resultList);
    }

    function handleListSnapshotsQueryNoResult(errorMsg) {
        console.log("ListSnapshotsPage.handleListSnapshotsQueryNoResult()");
        setQueryErrorMsg(errorMsg);
    }

    function handleListSnapshotsQueryError(errorMsg) {
        console.log("ListSnapshotsPage.handleListSnapshotsQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotList() {
        console.log("ListSnapshotsPage.getSnapshotList()");
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotsUsingFilter(
            filter, handleListSnapshotsQueryResult, handleListSnapshotsQueryNoResult, handleListSnapshotsQueryError);
    }

    return (
        <div>
            <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
            <FilterCriteriaPanel
                criteriaList={filterCriteria}
                handleSubmitFunction={handleSubmit}
                handleResetFunction={handleReset}
                handleDeleteCriteriaFunction={handleDeleteCriteria}
                heading="Snapshot List Filter Criteria"
                beginPrompt="To begin, add criteria to snapshot list filter." />
            <QueryResultsPanel snapshots={snapshotList} errorMsg={queryErrorMsg}/>
        </div>
    );

}
