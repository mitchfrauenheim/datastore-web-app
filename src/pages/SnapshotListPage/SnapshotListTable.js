import {Link} from "react-router-dom";
import React from "react";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksTable from "../common/PvNamesWithLinksTable";

export default function SnapshotListTable({ snapshots = [] }) {

    function handleClickSnapshotLink(snapshot) {
        console.log("SnapshotListTableRow.handleClickSnapshotLink()");
    }

    return (
        <table className="table-with-border">
            <tbody>
            <tr>
                <th>Snapshot ID</th>
                <th>Size</th>
                <th>Trigger Time</th>
                <th>First Sample Time</th>
                <th>Last Sample Time</th>
                <th>PV Names</th>
                <th>Attributes (name=>value)</th>
            </tr>
            {snapshots?.map((snapshot, i) => {
                return (
                    <tr key={i}>
                        <td>
                            <Link
                                onClick={() => handleClickSnapshotLink(snapshot)}
                                to={`/snapshot?id=${snapshot.id}`}>
                                {snapshot.id || "No id"}
                            </Link>
                        </td>
                        <td>
                            {snapshot.size}
                        </td>
                        <td>
                            <Link
                                onClick={() => handleClickSnapshotLink(snapshot)}
                                to={`/snapshot?id=${snapshot.id}`}>
                                {snapshot.snapshotTimestampLocaleString || ""}
                            </Link>
                        </td>
                        <td>{snapshot?.firstTimestampLocaleString || ""}</td>
                        <td>{snapshot?.lastTimestampLocaleString || ""}</td>
                        <td>
                            <PvNamesWithLinksTable objectWithPvs={snapshot}/>
                        </td>
                        <td>
                            <AttributePairsTable objectWithAttributes={snapshot}/>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
