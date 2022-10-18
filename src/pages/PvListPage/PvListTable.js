import React from "react";
import {Link} from "react-router-dom";

export default function PvListTable({ pvs = [] }) {

    return (
        <table>
            <tbody>
            <tr>
                <th>PV Name</th>
                <th>Attributes (name=>value)</th>
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
                        <td/>
                    </tr>);
            })}
            </tbody>
        </table>
    );
}
