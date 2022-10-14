import React, {useEffect, useState} from "react";
import SnapshotDetailsPanel from "./SnapshotDetailsPanel";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import SnapshotDataPanel from "./SnapshotDataPanel";
import SnapshotDetails from "../../domain/models/SnapshotDetails";
import QueryFilter from "../../domain/filter/QueryFilter";
import {useLocation, useSearchParams} from "react-router-dom";
import Constants from "../../domain/Constants";

export default function ViewSnapshotPage({ client, onOpen }) {

    let [snapshotDetails, setSnapshotDetails] = useState(null);
    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshotDataPage, setSnapshotDataPage] = useState(null);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);
    let [snapshotId, setSnapshotId] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();

    let handledParams = false;

    useEffect(() => {
        console.log("ViewSnapshotPage.useEffect()");
        getSnapshotDetails();
        if (handledParams) return;
        handledParams = true;
        console.log("handling URL parameters");
        applyUrlParams();
    }, [searchParams]);

    function applyUrlParams() {

        console.log("ViewSnapshotPage.applyUrlParams()");

        // extract id parameter
        setSnapshotId(searchParams.get(Constants.ID));

        // extract filter parameters and initialize filter
        filter.initFromUrlParams(searchParams);
        setFilterCriteria(filter.criteriaList);

        // execute query if filter is specified
        if (filter.criteriaList.length > 0) {
            getSnapshotData();
        }
    }

    function setUrlParams() {

        console.log("ViewSnapshotPage.setUrlParams()");
        let params = {};

        // set id parameter
        params[Constants.ID] = snapshotId;

        // add parameters for filter criteria
        filter.addUrlParams(params);

        // tell router to update browser URL search params
        setSearchParams(params);
    }

    function getSnapshotDetails() {
        console.log("ViewSnapshotPage.getSnapshotDetails()");
        // retrieve selected snapshot item from storage (saved if navigating from snapshot list)
        const savedSnapshotString = window.localStorage.getItem("snapshot");
        const savedSnapshotParsed = JSON.parse(savedSnapshotString);
        const savedSnapshotObject = Object.assign(
            new SnapshotDetails(), savedSnapshotParsed);
        setSnapshotDetails(savedSnapshotObject);
    }

    function updateCriteria () {
        console.log("ViewSnapshotPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleDeleteCriteria(criteria) {
        console.log("ViewSnapshotPage.handleDeleteCriteria(): " + criteria.displayString);
        filter.deleteCriteria(criteria);
        updateCriteria();
    }

    function handleSubmit() {
        console.log("ViewSnapshotPage.handleSubmit()");
        setUrlParams();
    }

    function handleReset() {
        console.log("ViewSnapshotPage.handleReset()");
        filter.reset();
        setUrlParams();
        setFilterCriteria([]);
        setSnapshotDataPage(null);
        setQueryErrorMsg(null);
    }

    function handleSnapshotDataQueryResult(snapshotDataPage) {
        console.log("ViewSnapshotPage.handleSnapshotDataQueryResult()");
        setSnapshotDataPage(snapshotDataPage);
    }

    function handleSnapshotDataQueryNoResult(errorMsg) {
        console.log("ViewSnapshotPage.handleSnapshotDataQueryNoResult()");
        setQueryErrorMsg(errorMsg);
    }

    function handleSnapshotDataQueryError(errorMsg) {
        console.log("ViewSnapshotPage.handleSnapshotDataQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotData() {
        console.log("ViewSnapshotPage.getSnapshot()");
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotDataUsingFilter(
            filter,
            handleSnapshotDataQueryResult,
            handleSnapshotDataQueryNoResult,
            handleSnapshotDataQueryError);
    }

    function renderSnapshotPage() {
        console.log("ViewSnapshotPage.renderSnapshotPage()");
        return (
            <div>
                <SnapshotDetailsPanel snapshotDetails={snapshotDetails} />
                <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
                <FilterCriteriaPanel
                    criteriaList={filterCriteria}
                    handleSubmitFunction={handleSubmit}
                    handleResetFunction={handleReset}
                    handleDeleteCriteriaFunction={handleDeleteCriteria}
                    heading="Snapshot Data Filter Criteria"
                    beginPrompt="To begin, add criteria to snapshot data filter." />
                <SnapshotDataPanel snapshotDataPage={snapshotDataPage} errorMsg={queryErrorMsg}/>
            </div>
        );
    }

    function renderNoSnapshotPage() {
        console.log("ViewSnapshotPage.renderSnapshotPage()");
        return <h1>No Snapshot ID Specified</h1>;
    }

    return (
        <div>
            {snapshotId ? renderSnapshotPage() : renderNoSnapshotPage()}
        </div>
    );
}
