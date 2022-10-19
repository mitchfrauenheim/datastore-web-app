import {epochSecondsToLocaleString} from "../../domain/utils/timestamp-utils";
import React from "react";
import {Link} from "react-router-dom";

export default function SnapshotDetailsPanel({ snapshotDetails }) {

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Snapshot Details</h1>
            <b>ID: </b><p>{snapshotDetails.id}</p>
            <b>Trigger Timestamp: </b><p>{snapshotDetails.timestamp}</p>
            <b>First Sample Time: </b><p>{snapshotDetails.firstTime}</p>
            <b>Last Sample Time: </b><p>{snapshotDetails.lastTime}</p>
            <b>PV Names: </b>
            <p>
                <table style={{border: 'none'}}>
                <tbody>
                {snapshotDetails.pvNames?.map((pvName, i) => {
                    return (
                        <tr>
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
            </p>
            <b>Attributes: </b><p>{snapshotDetails.attributesString}</p>
        </div>
    );

}
