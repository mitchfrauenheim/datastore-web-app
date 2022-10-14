import React, {useEffect, useState} from "react";
import QueryFilter from "../../domain/filter/QueryFilter";
import {useSearchParams} from "react-router-dom";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";

export default function PvListPage({client}) {

    let [filter, setFilter] = useState(new QueryFilter());
    let [filterCriteria, setFilterCriteria] = useState([]);
    let [pvList, setPvList] = useState([]);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();

    let handledParams = false;

    useEffect(() => {
        console.log("PvListPage.useEffect()");
        // const currentSearchParams = Object.fromEntries([...searchParams]);
        // console.log(currentSearchParams);
        if (handledParams) return;
        handledParams = true;
        console.log("handling URL parameters");
        applyUrlParams();
    }, [searchParams]);

    function applyUrlParams() {
        console.log("PvListPage.applyUrlParams()");
        filter.initFromUrlParams(searchParams);
        setFilterCriteria(filter.criteriaList);
        if (filter.criteriaList.length > 0) {
            getPvList();
        }
    }

    function updateCriteria() {
        console.log("PvListPage.updateCriteria()");
        setFilterCriteria(filter.criteriaList);
    }

    function handleDeleteCriteria(criteria) {
        console.log("PvListPage.handleDeleteCriteria(): " + criteria.displayString);
        filter.deleteCriteria(criteria);
        updateCriteria();
    }

    function handleSubmit() {
        console.log("PvListPage.handleSubmit()");
        setSearchParams(filter.urlParams);
    }

    function handleReset() {
        console.log("PvListPage.handleReset()");
        filter.reset();
        setSearchParams({});
        setFilterCriteria([]);
        setPvList([]);
        setQueryErrorMsg(null);
    }

    function handleListPvsQueryResult(resultList) {
        console.log("PvListPage.handleListPvsQueryResult()");
        setPvList(resultList);
    }

    function handleListPvsQueryNoResult(errorMsg) {
        console.log("PvListPage.handleListPvsQueryNoResult()");
        setQueryErrorMsg(errorMsg);
    }

    function handleListPvsQueryError(errorMsg) {
        console.log("PvListPage.handleListPvsQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getPvList() {
        console.log("PvListPage.getPvList()");
        client.queryListPvsUsingFilter(
            filter, handleListPvsQueryResult, handleListPvsQueryNoResult, handleListPvsQueryError);
    }

    return (
        <div>
            <FilterEditPanel filter={filter} updateCriteriaFunction={updateCriteria}/>
            <FilterCriteriaPanel
                criteriaList={filterCriteria}
                handleSubmitFunction={handleSubmit}
                handleResetFunction={handleReset}
                handleDeleteCriteriaFunction={handleDeleteCriteria}
                heading="PV List Filter Criteria"
                beginPrompt="To begin, add criteria to PV list filter." />
            <QueryResultsPanel pvs={pvList} errorMsg={queryErrorMsg}/>
        </div>
    );

}
