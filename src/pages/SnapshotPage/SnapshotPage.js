import React, {useEffect, useState} from "react";
import SnapshotDetailsPanel from "./SnapshotDetailsPanel";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import SnapshotDataPanel from "./SnapshotDataPanel";
import QueryFilter from "../../domain/filter/QueryFilter";
import {useLocation, useSearchParams} from "react-router-dom";
import Constants from "../../domain/Constants";

export default function SnapshotPage({ client, onOpen }) {

    let [snapshotDetails, setSnapshotDetails] = useState(null);
    let [detailsQueryErrorMsg, setDetailsQueryErrorMsg] = useState(null);
    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshotDataPage, setSnapshotDataPage] = useState(null);
    let [dataQueryErrorMsg, setDataQueryErrorMsg] = useState(null);
    let [snapshotId, setSnapshotId] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();

    let handledParams = false;

    useEffect(() => {
        console.log("SnapshotPage.useEffect()");
        if (handledParams) return;
        handledParams = true;
        console.log("handling URL parameters");
        applyUrlParams();
    }, [searchParams]);

    function applyUrlParams() {

        console.log("SnapshotPage.applyUrlParams()");

        // extract id parameter
        const snapshotIdValue = searchParams.get(Constants.ID);
        setSnapshotId(snapshotIdValue);

        // retrieve metadata details for specified snapshot id
        getSnapshotDetails(snapshotIdValue);

        // extract filter parameters and initialize filter
        filter.snapshotId = snapshotIdValue;
        filter.initFromUrlParams(searchParams);
        setFilterCriteria(filter.criteriaList);

        // execute query if filter is specified
        if (filter.criteriaList.length > 0) {
            getSnapshotData();
        }
    }

    function setUrlParams() {

        console.log("SnapshotPage.setUrlParams()");
        let params = {};

        // set id parameter
        params[Constants.ID] = snapshotId;

        // add parameters for filter criteria
        filter.addUrlParams(params);

        // tell router to update browser URL search params
        setSearchParams(params);
    }

    function getSnapshotDetails(snapshotIdValue) {
        console.log("SnapshotPage.getSnapshotDetails()");
        client.queryGetSnapshotById(
            snapshotIdValue,
            handleSnapshotDetailsQueryResult,
            handleSnapshotDetailsQueryNoResult,
            handleSnapshotDetailsQueryError);
    }

    function handleSnapshotDetailsQueryResult(snapshot) {
        console.log("SnapshotPage.handleSnapshotDetailsQueryResult()");
        setSnapshotDetails(snapshot);
    }

    function handleSnapshotDetailsQueryNoResult(errorMsg) {
        console.log("SnapshotPage.handleSnapshotDetailsQueryNoResult()");
        setDetailsQueryErrorMsg(errorMsg);
    }

    function handleSnapshotDetailsQueryError(errorMsg) {
        console.log("SnapshotPage.handleSnapshotDetailsQueryError()");
        setDetailsQueryErrorMsg(errorMsg);
    }

    function updateCriteria () {
        console.log("SnapshotPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleDeleteCriteria(criteria) {
        console.log("SnapshotPage.handleDeleteCriteria(): " + criteria.displayString);
        filter.deleteCriteria(criteria);
        updateCriteria();
    }

    function handleSubmit() {
        console.log("SnapshotPage.handleSubmit()");
        setUrlParams();
    }

    function handleReset() {
        console.log("SnapshotPage.handleReset()");
        filter.reset();
        setUrlParams();
        setFilterCriteria([]);
        setSnapshotDataPage(null);
        setDataQueryErrorMsg(null);
    }

    function getSnapshotData() {
        console.log("SnapshotPage.getSnapshot()");
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotDataUsingFilter(
            filter,
            handleSnapshotDataQueryResult,
            handleSnapshotDataQueryNoResult,
            handleSnapshotDataQueryError);
    }

    function handleSnapshotDataQueryResult(snapshotDataPage) {
        console.log("SnapshotPage.handleSnapshotDataQueryResult()");
        setSnapshotDataPage(snapshotDataPage);
    }

    function handleSnapshotDataQueryNoResult(errorMsg) {
        console.log("SnapshotPage.handleSnapshotDataQueryNoResult()");
        setDataQueryErrorMsg(errorMsg);
    }

    function handleSnapshotDataQueryError(errorMsg) {
        console.log("SnapshotPage.handleSnapshotDataQueryError()");
        setDataQueryErrorMsg(errorMsg);
    }

    function renderSnapshotPage() {
        console.log("SnapshotPage.renderSnapshotPage()");
        return (
            <div>
                <SnapshotDetailsPanel snapshotDetails={snapshotDetails} errorMsg={detailsQueryErrorMsg}/>
                <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
                <FilterCriteriaPanel
                    criteriaList={filterCriteria}
                    handleSubmitFunction={handleSubmit}
                    handleResetFunction={handleReset}
                    handleDeleteCriteriaFunction={handleDeleteCriteria}
                    heading="Snapshot Data Filter Criteria"
                    beginPrompt="To begin, add criteria to snapshot data filter." />
                <SnapshotDataPanel snapshotDataPage={snapshotDataPage} errorMsg={dataQueryErrorMsg}/>
            </div>
        );
    }

    function renderNoSnapshotPage() {
        console.log("SnapshotPage.renderNoSnapshotPage()");
        return <h1>No Snapshot ID Specified</h1>;
    }

    return (
        <div>
            {snapshotId ? renderSnapshotPage() : renderNoSnapshotPage()}
        </div>
    );
}
