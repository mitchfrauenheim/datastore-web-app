import React from "react";
import { Link } from "react-router-dom";
import FieldNameTypeTable from "../common/FieldNameTypeTable";
import AttributeNameTable from "../common/AttributeNameTable";

export default function PvListTable({ pvs = [] }) {

    return (
        <div className="table-wrapper">
            <table className="w-full">
                <thead>
                    <tr className="text-slate-800">
                        <th>PV Name</th>
                        <th>First Time</th>
                        <th>Last Time</th>
                        <th>Provider ID</th>
                        <th>Fields</th>
                        <th>Attributes</th>
                    </tr>
                </thead>
                <tbody>
                    {pvs?.map((pv, i) => {
                        return (
                            <tr key={i} className="table-row">
                                <td>
                                    <Link
                                        to={`/pv?name=${pv.name}`}>
                                        {pv.name}
                                    </Link>
                                </td>
                                <td> {pv.firstTimestampDisplayString}</td>
                                <td> {pv.lastTimestampDisplayString}</td>
                                <td> {pv.providerId}</td>
                                <td>
                                    <FieldNameTypeTable objectWithFields={pv} />
                                </td>
                                <td>
                                    <AttributeNameTable objectWithAttributes={pv} />
                                </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}
