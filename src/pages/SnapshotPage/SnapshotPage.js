import React, { useEffect, useState, useRef } from "react";
import SnapshotDetailsPanel from "./SnapshotDetailsPanel";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import SnapshotDataPanel from "./SnapshotDataPanel";
import QueryFilter from "../../domain/filter/QueryFilter";
import { useLocation, useSearchParams } from "react-router-dom";
import Constants from "../../domain/Constants";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { Dialog, Disclosure } from "@headlessui/react";
import DisclosureHead from "../../components/DisclosureHead";

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
        filter.minFirstTime = snapshot.firstTimestampIsoString;
        filter.maxLastTime = snapshot.lastTimestampIsoString;
        filter.availablePvsList = snapshot.pvNames;
        if (snapshot.size <= 0) {
            handleSnapshotDetailsQueryError("error: snapshot size returned by API is zero")
        }
        const durationSeconds = snapshot.lastTimestampSeconds - snapshot.firstTimestampSeconds;
        if (durationSeconds <= 0) {
            handleSnapshotDetailsQueryError("error: snapshot time range returned by API is invalid");
        }
        // execute query if filter is specified
        if (filter.criteriaList.length > 0) {
            getSnapshotData(snapshot);
        }
    }

    function handleSnapshotDetailsQueryNoResult(errorMsg) {
        console.log("SnapshotPage.handleSnapshotDetailsQueryNoResult()");
        setDetailsQueryErrorMsg(errorMsg);
    }

    function handleSnapshotDetailsQueryError(errorMsg) {
        console.log("SnapshotPage.handleSnapshotDetailsQueryError()");
        setDetailsQueryErrorMsg(errorMsg);
    }

    function updateCriteria() {
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
        setDataQueryErrorMsg(null);
        setUrlParams();
        alert('Collapse the "Details" and/or "Snapshot Data Filters" panels to view the data more clearly.')
    }

    function handleReset() {
        console.log("SnapshotPage.handleReset()");
        filter.reset();
        setUrlParams();
        setFilterCriteria([]);
        setSnapshotDataPage(null);
        setDataQueryErrorMsg(null);
    }

    function getSnapshotData(snapshot) {
        console.log("SnapshotPage.getSnapshot()");
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.getFirstSnapshotDataPage(
            filter,
            snapshot,
            handleSnapshotDataQueryResult,
            handleSnapshotDataQueryNoResult,
            handleSnapshotDataQueryError);
    }

    function handleNextDataPage() {
        console.log("SnapshotPage.handleNextDataPage()");
        console.log(snapshotDataPage);
        console.log(snapshotDataPage.pageQueryParams);
        client.getNextSnapshotDataPage(
            snapshotDataPage,
            handleSnapshotDataQueryResult,
            handleSnapshotDataQueryNoResult,
            handleSnapshotDataQueryError);
    }

    function handlePreviousDataPage() {
        console.log("SnapshotPage.handlePreviousDataPage()");
        client.getPreviousSnapshotDataPage(
            snapshotDataPage,
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
            <div id="snapshot-wrapper" className="page-wrapper">
                <div id="snapshot-breadcrumbs" className="custom-breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/snapshotList">Snapshot List Filter</Link></li>
                        <li>Snapshot View</li>
                    </ul>
                </div>
                <div id="snapshot-content" className="page-content">
                    <PageTitle pageName="Snapshot View" />
                    <SnapshotDetailsPanel snapshotDetails={snapshotDetails} errorMsg={detailsQueryErrorMsg} />
                    <Disclosure>
                        <div id="snapshot-data-filter-wrapper" className="page-filter-wrapper">
                            <DisclosureHead titleText="Snapshot Data Filters" />
                            <Disclosure.Panel>
                                <div className="my-4 border-b border-gray-300"></div>
                                <div id="snapshot-data-edit-panel" className="filter-edit-panel">
                                    <FilterEditPanel
                                        filter={filter}
                                        updateCriteriaFunction={updateCriteria}
                                        handleResetFunction={handleReset} />
                                </div>
                                <div id="snapshot-data-criteria-panel" className="px-8">
                                    <FilterCriteriaPanel
                                        criteriaList={filterCriteria}
                                        handleSubmitFunction={handleSubmit}
                                        handleResetFunction={handleReset}
                                        handleDeleteCriteriaFunction={handleDeleteCriteria}
                                        heading="Snapshot Data Filter Criteria"
                                        beginPrompt="To begin, add criteria to snapshot data filter." />
                                </div>
                            </Disclosure.Panel>
                        </div>
                    </Disclosure>
                    <SnapshotDataPanel
                        snapshotDataPage={snapshotDataPage}
                        errorMsg={dataQueryErrorMsg}
                        handlePreviousPageFunction={handlePreviousDataPage}
                        handleNextPageFunction={handleNextDataPage} />
                </div>
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
