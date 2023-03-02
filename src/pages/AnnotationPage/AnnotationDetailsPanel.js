import React from "react";
import KeyValuePair from "../../components/KeyValuePair";

export default function AnnotationDetailsPanel({ annotation }) {

    return (
        <div id="annotation-details" className="page-filter-wrapper">
            <div id="pv-head-wrapper" className="flex flex-row justify-between px-8">
                <div id="title" className="font-semibold text-slate-800">
                    <h2>Details</h2>
                </div>
            </div>
            <div className="my-4 border-b border-gray-300"></div>
            <div className="flex flex-row flex-wrap space-x-10 px-8 mb-6">
                <KeyValuePair index="Name" value={annotation.name} />
                <KeyValuePair index="Query" value={annotation.query} />
            </div>
        </div>
    );

}
