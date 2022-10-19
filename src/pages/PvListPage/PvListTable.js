import React from "react";
import {Link} from "react-router-dom";

export default function PvListTable({ pvs = [] }) {

    return (
        <table className="result-list-table">
            <tbody>
                <tr>
                    <th>PV Name</th>
                </tr>
                {pvs?.map((pv, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                <Link
                                    to={`/pv?name=${pv.name}`}>
                                    {pv.name}
                                </Link>
                            </td>
                        </tr>);
                })}
            </tbody>
        </table>
    );
}
