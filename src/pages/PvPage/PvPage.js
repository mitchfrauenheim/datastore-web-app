import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Constants from "../../domain/Constants";
import QueryFilter from "../../domain/filter/QueryFilter";
import PvDetailsPanel from "./PvDetailsPanel";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

export default function PvPage({ client, onOpen }) {

    let [pv, setPv] = useState(null);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();

    let handledParams = false;
    let pvName = "";

    useEffect(() => {
        console.log("PvPage.useEffect()");
        if (handledParams) return;
        handledParams = true;
        applyUrlParams();
    }, []);

    function applyUrlParams() {
        console.log("PvPage.applyUrlParams()");
        // extract name parameter
        const name = searchParams.get(Constants.PVNAME)
        if (name === null) {
            setQueryErrorMsg("No PV Name Specified in URL Params")
        } else {
            console.log("pvName: " + name);
            pvName = name;
            // execute query if name is specified
            if (name !== null) {
                getPvDetails(name);
            }
        }
    }

    function handleQueryResult(pvList) {
        console.log("PvPage.handleQueryResult()");
        if (pvList.length > 1) {
            setQueryErrorMsg("Name: " + pvName + " matches more than one PV.");
        } else if (pvList.length === 0) {
            setQueryErrorMsg("Unknown PV Name: " + pvName);
        } else {
            setPv(pvList[0]);
        }
    }

    function handleQueryNoResult(errorMsg) {
        console.log("PvPage.handleQueryNoResult()");
        setQueryErrorMsg("No PV found for name: " + pvName);
    }

    function handleQueryError(errorMsg) {
        console.log("PvPage.handleQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getPvDetails(name) {
        console.log("PvPage.getPvDetails()");
        let filter = new QueryFilter();
        filter.addPvCriteria(name);
        client.queryListPvsUsingFilter(
            filter,
            handleQueryResult,
            handleQueryNoResult,
            handleQueryError);
    }

    function renderPvPage() {
        console.log("PvPage.renderPvPage()");
        return (
            <div id="pv-wrapper" className="page-wrapper">
                <div id="snapshot-breadcrumbs" className="custom-breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/pvList">PV List Filter</Link></li>
                        <li>PV View</li>
                    </ul>
                </div>
                <div id="pv-content" className="page-content">
                    <PageTitle pageName="PV View" />
                    <PvDetailsPanel pv={pv} />
                </div>
            </div>
        );
    }

    function renderNoPvPage() {
        console.log("PvPage.renderNoPvPage()");
        return <h1>{queryErrorMsg}</h1>;
    }

    return (
        <div>
            {pv ? renderPvPage() : renderNoPvPage()}
        </div>
    );
}
