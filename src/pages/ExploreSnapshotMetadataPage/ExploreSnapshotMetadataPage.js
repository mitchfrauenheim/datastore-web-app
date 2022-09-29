import React, {useEffect, useState} from "react";
import Snapshot from "../../domain/Snapshot";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "./FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import SnapshotMetadataFilter from "../../domain/SnapshotMetadataFilter";

export default function ExploreSnapshotMetadataPage({client}) {

    let [filter, setFilter] = useState(new SnapshotMetadataFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshots, setSnapshots] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);
    let snapshotQuerySubmitted = false;

    // useEffect(() => {
    //
    //     // place code here that should only be called once per render cycle
    //     console.log("ExploreSnapshotMetadataPage.useEffect()");
    //
    // }, []);

    function updateCriteria () {
        console.log("ExploreSnapshotMetadataPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleSubmit() {
        console.log("ExploreSnapshotMetadataPage.handleSubmit()");
        getSnapshotMetadata();
    }

    function handleSnapshotMetadataQueryResult(resultList) {
        setSnapshots(resultList);
    }

    function handleSnapshotMetadataQueryError(errorMsg) {
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotMetadata() {

        console.log("ExploreSnapshotMetadataPage.getSnapshotMetadata()");

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
