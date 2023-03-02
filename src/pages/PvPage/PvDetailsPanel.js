import React from "react";
import FieldNameTypeTable from "../common/FieldNameTypeTable";
import AttributeNameTable from "../common/AttributeNameTable";
import { Link } from "react-router-dom";
import KeyValuePair from "../../components/KeyValuePair";

export default function PvDetailsPanel({ pv }) {

        return (
                <div id="pv-details" className="page-filter-wrapper">
                        <div id="pv-head-wrapper" className="flex flex-row justify-between px-8">
                                <div id="title" className="font-semibold text-slate-800">
                                        Details
                                </div>
                        </div>
                        <div className="my-4 border-b border-gray-300"></div>
                        {/* <div id="pv-details-body" className="flex flex-row flex-wrap px-8"> */}
                                <div className="flex flex-row flex-wrap space-x-10 px-8 mb-6">
                                        <KeyValuePair index="Name" value={pv.name} />
                                        {/* <b>Name: </b>
                                        <p>
                                                {pv.name + ' '}
                                                <Link to={`/snapshotList?pvPattern1=${pv.name}`}>
                                                        (view snapshots)
                                                </Link>
                                        </p> */}
                                        <KeyValuePair index="First Time" value={pv.firstTimestampDisplayString} />
                                        <KeyValuePair index="Last Time" value={pv.lastTimestampDisplayString} />
                                        <KeyValuePair index="Provider ID" value={pv.providerId} />
                                        {/* <b>First Time: </b><p>{pv.firstTimestampDisplayString}</p> */}
                                        {/* <b>Last Time: </b><p>{pv.lastTimestampDisplayString}</p>
                                        <b>Provider ID: </b><p>{pv.providerId}</p> */}
                                </div>
                                <div className="flex flex-row space-x-10 px-8">
                                <KeyValuePair index="Field Names and Types" value={<FieldNameTypeTable objectWithFields={pv} />} />
                                <KeyValuePair index="Attributes" value={<AttributeNameTable objectWithAttributes={pv} pvName={pv.name} showAll={true} />} />
                                </div>
                                {/* <b>Field Names and Types:</b>
                                <p />
                                <FieldNameTypeTable objectWithFields={pv} />
                                <p /> */}
                                {/* <b>Attributes: </b>
                                <p />
                                <AttributeNameTable objectWithAttributes={pv} />
                                <p /> */}
                        {/* </div> */}
                </div>
        );

}
