import React, {useEffect, useState} from "react";
import SnapshotDetailsPanel from "./SnapshotDetailsPanel";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import SnapshotDataPanel from "./SnapshotDataPanel";
import SnapshotDetails from "../../domain/SnapshotDetails";
import QueryFilter from "../../domain/QueryFilter";

export default function ViewSnapshotPage({ client, onOpen }) {

    let [snapshotDetails, setSnapshotDetails] = useState(null);
    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [snapshotDataPage, setSnapshotDataPage] = useState(null);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let snapshotQuerySubmitted = false;

    // let [searchParams, setSearchParams] = useSearchParams();

    // get url search params
    // let snapshotId = searchParams.get("id");
    // let firstSeconds = searchParams.get("first");
    // let lastSeconds = searchParams.get("last");

    useEffect(() => {
        console.log("ViewSnapshotPage.useEffect()");
        getSnapshotDetails();
    }, []);

    function getSnapshotDetails() {
        console.log("ViewSnapshotPage.getSnapshotDetails()");
        // retrieve selected snapshot item from storage (saved if navigating from snapshot list)
        const savedSnapshotString = window.localStorage.getItem("snapshot");
        const savedSnapshotParsed = JSON.parse(savedSnapshotString);
        const savedSnapshotObject = Object.assign(new SnapshotDetails(), savedSnapshotParsed);
        setSnapshotDetails(savedSnapshotObject);
    }

    function updateCriteria () {
        console.log("ViewSnapshotPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleSubmit() {
        console.log("ViewSnapshotPage.handleSubmit()");
        getSnapshotData();
    }

    function handleSnapshotDataQueryResult(snapshotDataPage) {
        console.log("ViewSnapshotPage.handleSnapshotDataQueryResult()");
        setSnapshotDataPage(snapshotDataPage);
    }

    function handleSnapshotDataQueryError(errorMsg) {
        console.log("ViewSnapshotPage.handleSnapshotDataQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getSnapshotData() {
        console.log("ViewSnapshotPage.getSnapshot()");
        if (snapshotQuerySubmitted) return;
        snapshotQuerySubmitted = true;
        // build and execute listSnapshots query
        console.log("requesting snapshot metadata query using filter");
        client.queryListSnapshotDataUsingFilter(filter, handleSnapshotDataQueryResult, handleSnapshotDataQueryError);
    }

    function renderSnapshotPage() {
        console.log("ViewSnapshotPage.renderSnapshotPage()");
        return (
            <div>
                <SnapshotDetailsPanel snapshotDetails={snapshotDetails} />
                <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
                <FilterCriteriaPanel criteriaList={filterCriteria} handleSubmitFunction={handleSubmit} heading="Snapshot Data Filter Criteria" beginPrompt="To begin, add criteria to snapshot data filter." />
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
            {snapshotDetails ? renderSnapshotPage() : renderNoSnapshotPage()}
        </div>
    );
}
