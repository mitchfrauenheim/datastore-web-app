import React from "react";
import {Link} from "react-router-dom";

export default function PvNamesWithLinksTable({objectWithPvs}) {

    return (
        <table className="table-without-border">
            <tbody>
            {objectWithPvs.pvNames?.map((pvName, i) => {
                return (
                    <tr key={i}>
                        <td>
                            <Link
                                to={`/pv?name=${pvName}`}>
                                {pvName}
                            </Link>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>

    );
}
