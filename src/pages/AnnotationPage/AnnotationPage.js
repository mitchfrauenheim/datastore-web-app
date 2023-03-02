import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Constants from "../../domain/Constants";
import QueryFilter from "../../domain/filter/QueryFilter";
import AnnotationDetailsPanel from "./AnnotationDetailsPanel";

export default function AnnotationPage({ client, onOpen }) {

    let [annotation, setAnnotation] = useState(null);
    let [queryErrorMsg, setQueryErrorMsg] = useState(null);

    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();

    let handledParams = false;
    let annotationName = "";

    useEffect(() => {
        console.log("AnnotationPage.useEffect()");
        if (handledParams) return;
        handledParams = true;
        applyUrlParams();
    }, []);

    function applyUrlParams() {
        console.log("AnnotationPage.applyUrlParams()");
        // extract name parameter
        const name = searchParams.get(Constants.ANNOTATIONNAME)
        if (name === null) {
            setQueryErrorMsg("No Annotation Name Specified in URL Params")
        } else {
            console.log("annotation name: " + name);
            annotationName = name;
            // execute query if name is specified
            if (name !== null) {
                getAnnotationDetails(name);
            }
        }
    }

    function handleQueryResult(annotationList) {
        console.log("AnnotationPage.handleQueryResult()");
        if (annotationList.length > 1) {
            setQueryErrorMsg("Name: " + annotationName + " matches more than one annotation.");
        } else if (annotationList.length === 0) {
            setQueryErrorMsg("Unknown Annotation Name: " + annotationName);
        } else {
            setAnnotation(annotationList[0]);
        }
    }

    function handleQueryNoResult(errorMsg) {
        console.log("AnnotationPage.handleQueryNoResult()");
        setQueryErrorMsg("No annotation found for name: " + annotationName);
    }

    function handleQueryError(errorMsg) {
        console.log("AnnotationPage.handleQueryError()");
        setQueryErrorMsg(errorMsg);
    }

    function getAnnotationDetails(name) {
        console.log("AnnotationPage.getAnnotationDetails()");
        let filter = new QueryFilter();
        filter.addAnnotationCriteria(name);
        client.queryListAnnotationsUsingFilter(
            filter,
            handleQueryResult,
            handleQueryNoResult,
            handleQueryError);
    }

    function renderAnnotationPage() {
        console.log("AnnotationPage.renderAnnotationPage()");
        return (
            <div id="annotation-wrapper" className="page-wrapper">
                <div id="annotation-breadcrumbs" className="custom-breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/annotationList">Annotation List Filter</Link></li>
                        <li>Annotation View</li>
                    </ul>
                </div>
                <div id="annotation-content" className="page-content">
                    <PageTitle pageName="Annotation View" />
                    <AnnotationDetailsPanel annotation={annotation} />
                </div>
            </div>
        );
    }

    function renderNoAnnotationPage() {
        console.log("AnnotationPage.renderNoAnnotationPage()");
        return <h1>{queryErrorMsg}</h1>;
    }

    return (
        annotation ? renderAnnotationPage() : renderNoAnnotationPage()
    );
}
