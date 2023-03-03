import React from "react";
import FieldNameTypeTable from "../common/FieldNameTypeTable";
import AttributeNameTable from "../common/AttributeNameTable";
import KeyValuePair from "../../components/KeyValuePair";

export default function PvDetailsPanel({ pv }) {

        return (
                <div id="pv-details" className="page-filter-wrapper">
                        <div id="pv-head-wrapper" className="flex flex-row justify-between px-8">
                                <div id="title" className="font-semibold text-slate-800">
                                        <h2>Details</h2>
                                </div>
                        </div>
                        <div className="my-4 border-b border-gray-300"></div>
                        <div className="flex flex-row flex-wrap space-x-10 px-8 mb-6">
                                <KeyValuePair index="Name" value={pv.name} />
                                <KeyValuePair index="First Time" value={pv.firstTimestampDisplayString} />
                                <KeyValuePair index="Last Time" value={pv.lastTimestampDisplayString} />
                                <KeyValuePair index="Provider ID" value={pv.providerId} />
                        </div>
                        <div className="flex flex-row space-x-10 px-8">
                                <KeyValuePair index="Field Names and Types" value={<FieldNameTypeTable objectWithFields={pv} />} />
                                <KeyValuePair index="Attributes" value={<AttributeNameTable objectWithAttributes={pv} pvName={pv.name} showAll={true} />} />
                        </div>
                </div>
        );

}
