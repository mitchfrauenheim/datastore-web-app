import React, { useEffect, useState } from "react";
import QueryFilter from "../../domain/filter/QueryFilter";
import { useSearchParams } from "react-router-dom";
import FilterEditPanel from "./FilterEditPanel";
import FilterCriteriaPanel from "../common/FilterCriteriaPanel";
import QueryResultsPanel from "./QueryResultsPanel";
import { Link } from 'react-router-dom'
import FilterPageTitle from "../../components/FilterPageTitle";
import { Disclosure } from "@headlessui/react";

export default function PvListPage({ client }) {

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
        } else {
            setPvList([]);
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
        if (filter.pvCriteriaList.length > 1) {
            const errorMsg = "error: only a single PV filter criteria is allowed";
            setQueryErrorMsg(errorMsg);
        } else {
            setQueryErrorMsg(null);
            setSearchParams(filter.urlParams);
        }
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
        <div id="pv-list-wrapper" className="page-wrapper">
            <div id="pv-list-breadcrumbs" className="custom-breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>PV List Filter</li>
                </ul>
            </div>
            <div className="overflow-y-scroll h-full">
                <div id="pv-list-content" className="page-content">
                    <Disclosure defaultOpen={true}>
                        <div id="pv-list-title-wrapper">
                            <FilterPageTitle pageName="PV List Filter" />
                        </div>
                        <Disclosure.Panel>
                            <div id="pv-list-filter-wrapper" className="page-filter-wrapper">
                                <div id="pv-list-edit-panel" className="px-8 pb-4">

                                    <FilterEditPanel filter={filter}
                                        updateCriteriaFunction={updateCriteria}
                                        handleResetFunction={handleReset} />
                                </div>
                                <div className="mb-4 border-b border-gray-300"></div>
                                <div id="pv-list-criteria-panel" className="px-8">
                                    <FilterCriteriaPanel
                                        criteriaList={filterCriteria}
                                        handleSubmitFunction={handleSubmit}
                                        handleResetFunction={handleReset}
                                        handleDeleteCriteriaFunction={handleDeleteCriteria}
                                        heading="PV List Filter Criteria"
                                        beginPrompt="To begin, add criteria to PV list filter." />
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Disclosure>
                    <QueryResultsPanel pvs={pvList} errorMsg={queryErrorMsg} />
                </div>
            </div>
        </div>
    );

}
