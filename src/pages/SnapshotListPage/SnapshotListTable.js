import { Link } from "react-router-dom";
import React from "react";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksParagraph from "../common/PvNamesWithLinksParagraph";
import Timestamp from "../../components/Timestamp";

export default function SnapshotListTable({ snapshots = [] }) {

    function handleClickSnapshotLink(snapshot) {
        console.log("SnapshotListTableRow.handleClickSnapshotLink()");
    }

    return (
        <div className="table-wrapper">
            <table className="w-full">
                <thead>
                    <tr className="text-slate-800">
                        <th>ID</th>
                        <th>Size</th>
                        <th>Trigger Time</th>
                        <th>First Sample Time</th>
                        <th>Last Sample Time</th>
                        <th>PV Names</th>
                        <th>Attributes</th>
                    </tr>
                </thead>
                <tbody>
                    {snapshots?.map((snapshot, i) => {
                        return (
                            <tr key={i} className="table-row">
                                <td className="font-medium">
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
                                        {/* {snapshot.snapshotTimestampDisplayString || ""} */}
                                        <Timestamp splitLines={true} timestamp={snapshot.snapshotTimestampDisplayString} />
                                    </Link>
                                </td>
                                <td>
                                    {/* {snapshot?.firstTimestampDisplayString || ""} */}
                                    <Timestamp splitLines={true} timestamp={snapshot.firstTimestampDisplayString} />
                                </td>
                                <td>
                                    {/* {snapshot?.lastTimestampDisplayString || ""} */}
                                    <Timestamp splitLines={true} timestamp={snapshot.lastTimestampDisplayString} />
                                </td>
                                <td>
                                    <PvNamesWithLinksParagraph objectWithPvs={snapshot} snapshotID={snapshot.id} showAll={false} />
                                </td>
                                <td>
                                    <AttributePairsTable objectWithAttributes={snapshot} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
