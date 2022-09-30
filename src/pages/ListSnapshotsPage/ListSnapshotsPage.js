import React, {useEffect, useState} from "react";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import QueryFilter from "../../domain/QueryFilter";

export default function ListSnapshotsPage({client}) {

    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshotList, setSnapshotList] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);
    let snapshotQuerySubmitted = false;

    function updateCriteria () {
        console.log("ListSnapshotsPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleSubmit() {
        console.log("ListSnapshotsPage.handleSubmit()");
        getSnapshotList();
    }

    function handleListSnapshotsQueryResult(resultList) {
        console.log("ListSnapshotsPage.handleListSnapshotsQueryResult()");
        setSnapshotList(resultList);
    }

    function handleListSnapshotsQueryError(errorMsg) {
        console.log("ListSnapshotsPage.handleListSnapshotsQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotList() {
        console.log("ListSnapshotsPage.getSnapshotList()");
        if (snapshotQuerySubmitted) return;
        snapshotQuerySubmitted = true;
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotsUsingFilter(filter, handleListSnapshotsQueryResult, handleListSnapshotsQueryError);
    }

    return (
        <div>
            <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
            <FilterCriteriaPanel criteriaList={filterCriteria} handleSubmitFunction={handleSubmit} heading="Snapshot List Filter Criteria" beginPrompt="To begin, add criteria to snapshot list filter." />
            <QueryResultsPanel snapshots={snapshotList} errorMsg={queryErrorMsg}/>
        </div>
    );

}
