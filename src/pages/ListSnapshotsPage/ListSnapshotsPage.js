import React, {useEffect, useState} from "react";
import Snapshot from "../../domain/Snapshot";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "./FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import SnapshotMetadataFilter from "../../domain/SnapshotMetadataFilter";

export default function ListSnapshotsPage({client}) {

    let [filter, setFilter] = useState(new SnapshotMetadataFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshots, setSnapshots] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);
    let snapshotQuerySubmitted = false;

    // useEffect(() => {
    //
    //     // place code here that should only be called once per render cycle
    //     console.log("ListSnapshotsPage.useEffect()");
    //
    // }, []);

    function updateCriteria () {
        console.log("ListSnapshotsPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleSubmit() {
        console.log("ListSnapshotsPage.handleSubmit()");
        getSnapshotMetadata();
    }

    function handleSnapshotMetadataQueryResult(resultList) {
        setSnapshots(resultList);
    }

    function handleSnapshotMetadataQueryError(errorMsg) {
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotMetadata() {

        console.log("ListSnapshotsPage.getSnapshotMetadata()");

        if (snapshotQuerySubmitted) return;
        snapshotQuerySubmitted = true;

        // request snapshot metadata query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotsUsingFilter(filter, handleSnapshotMetadataQueryResult, handleSnapshotMetadataQueryError);
    }

    return (
        <div>
            <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
            <FilterCriteriaPanel criteriaList={filterCriteria} handleSubmitFunction={handleSubmit}/>
            <QueryResultsPanel snapshots={snapshots} errorMsg={queryErrorMsg}/>
        </div>
    );

}
