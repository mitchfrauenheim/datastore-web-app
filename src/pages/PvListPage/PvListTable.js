import React from "react";

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
                            {pv.name}
                        </td>
                        <td/>
                    </tr>);
            })}
            </tbody>
        </table>
    );
}
