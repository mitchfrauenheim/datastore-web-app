import {Link} from "react-router-dom";
import React from "react";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksParagraph from "../common/PvNamesWithLinksParagraph";

export default function SnapshotListTable({ snapshots = [] }) {

    function handleClickSnapshotLink(snapshot) {
        console.log("SnapshotListTableRow.handleClickSnapshotLink()");
    }

    return (
        <div className="bg-white rounded-xl shadow-md border border-black border-opacity-5 overflow-hidden">
        <table className="">
            <tbody>
            <tr className="bg-gray-200 text-medium">
                <th className="border border-black border-opacity-5">Snapshot ID</th>
                <th className="border border-black border-opacity-5">Size</th>
                <th className="border border-black border-opacity-5">Trigger Time</th>
                <th className="border border-black border-opacity-5">First Sample Time</th>
                <th className="border border-black border-opacity-5">Last Sample Time</th>
                <th className="border border-black border-opacity-5">PV Names</th>
                <th className="border border-black border-opacity-5">Attributes (name=>value)</th>
            </tr>
            {snapshots?.map((snapshot, i) => {
                return (
                    <tr key={i}>
                        <td className="border border-black border-opacity-5">
                            <Link
                                onClick={() => handleClickSnapshotLink(snapshot)}
                                to={`/snapshot?id=${snapshot.id}`}>
                                {snapshot.id || "No id"}
                            </Link>
                        </td>
                        <td className="border border-black border-opacity-5">
                            {snapshot.size}
                        </td>
                        <td className="border border-black border-opacity-5">
                            <Link
                                onClick={() => handleClickSnapshotLink(snapshot)}
                                to={`/snapshot?id=${snapshot.id}`}>
                                {snapshot.snapshotTimestampDisplayString || ""}
                            </Link>
                        </td>
                        <td className="border border-black border-opacity-5">{snapshot?.firstTimestampDisplayString || ""}</td>
                        <td className="border border-black border-opacity-5">{snapshot?.lastTimestampDisplayString || ""}</td>
                        <td className="border border-black border-opacity-5">
                            <PvNamesWithLinksParagraph objectWithPvs={snapshot}/>
                        </td>
                        <td className="border border-black border-opacity-5">
                            <AttributePairsTable objectWithAttributes={snapshot}/>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
}
