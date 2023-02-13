import React, { useEffect, useState } from "react";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import QueryFilter from "../../domain/filter/QueryFilter";
import { createSearchParams, useSearchParams } from "react-router-dom";
import FilterConstants from "../../domain/Constants";
import PageTitle from "../../components/PageTitle";
import { Link } from 'react-router-dom'
import { Disclosure } from "@headlessui/react";

export default function SnapshotListPage({ client }) {

    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshotList, setSnapshotList] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();

    let handledParams = false;

    useEffect(() => {
        console.log("SnapshotListPage.useEffect()");
        // const currentSearchParams = Object.fromEntries([...searchParams]);
        // console.log(currentSearchParams);
        if (handledParams) return;
        handledParams = true;
        console.log("handling URL parameters");
        applyUrlParams();
    }, [searchParams]);

    function applyUrlParams() {
        console.log("SnapshotListPage.applyUrlParams()");
        filter.initFromUrlParams(searchParams);
        setFilterCriteria(filter.criteriaList);
        if (filter.criteriaList.length > 0) {
            getSnapshotList();
        } else {
            setSnapshotList([]);
        }
    }

    function updateCriteria() {
        console.log("SnapshotListPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleDeleteCriteria(criteria) {
        console.log("SnapshotListPage.handleDeleteCriteria(): " + criteria.displayString);
        filter.deleteCriteria(criteria);
        updateCriteria();
    }

    function handleSubmit() {
        console.log("SnapshotListPage.handleSubmit()");
        setQueryErrorMsg(null);
        setSearchParams(filter.urlParams);
    }

    function handleReset() {
        console.log("SnapshotListPage.handleReset()");
        filter.reset();
        setSearchParams({});
        setFilterCriteria([]);
        setSnapshotList([]);
        setQueryErrorMsg(null);
    }

    function handleListSnapshotsQueryResult(resultList) {
        console.log("SnapshotListPage.handleListSnapshotsQueryResult()");
        setSnapshotList(resultList);
    }

    function handleListSnapshotsQueryNoResult(errorMsg) {
        console.log("SnapshotListPage.handleListSnapshotsQueryNoResult()");
        setQueryErrorMsg(errorMsg);
    }

    function handleListSnapshotsQueryError(errorMsg) {
        console.log("SnapshotListPage.handleListSnapshotsQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotList() {
        console.log("SnapshotListPage.getSnapshotList()");
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotsUsingFilter(
            filter, handleListSnapshotsQueryResult, handleListSnapshotsQueryNoResult, handleListSnapshotsQueryError);
    }

    return (
        <div id="snapshot-list-wrapper" className="page-wrapper">
            <div id="snapshot-list-breadcrumbs" className="custom-breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>Snapshot List Filter</li>
                </ul>
            </div>
            <div className="overflow-y-scroll h-full">
                <div id="snapshot-list-content" className="page-content">
                    <Disclosure defaultOpen={true}>
                        <div id="snapshot-list-title-wrapper">
                            <PageTitle pageName="Snapshot List Filter" />
                        </div>
                        <Disclosure.Panel>
                            <div id="snapshot-list-filter-wrapper" className="page-filter-wrapper">
                                <div id="snapshot-list-edit-panel" className="px-8 pb-4">
                                    <FilterEditPanel
                                        filter={filter}
                                        updateCriteriaFunction={updateCriteria}
                                        handleResetFunction={handleReset}
                                    />
                                </div>
                                <div className="mb-4 border-b border-gray-300"></div>
                                <div id="snapshot-list-criteria-panel" className="px-8">
                                    <FilterCriteriaPanel
                                        criteriaList={filterCriteria}
                                        handleSubmitFunction={handleSubmit}
                                        handleResetFunction={handleReset}
                                        handleDeleteCriteriaFunction={handleDeleteCriteria}
                                        heading="Snapshot List Filter Criteria"
                                        beginPrompt="To begin, add criteria to snapshot list filter."
                                    />
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Disclosure>
                    <QueryResultsPanel snapshots={snapshotList} errorMsg={queryErrorMsg} />
                </div>
            </div>
        </div>
    );

}
