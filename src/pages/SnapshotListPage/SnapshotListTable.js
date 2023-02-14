import {Link} from "react-router-dom";
import React from "react";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksParagraph from "../common/PvNamesWithLinksParagraph";

export default function SnapshotListTable({ snapshots = [] }) {

    function handleClickSnapshotLink(snapshot) {
        console.log("SnapshotListTableRow.handleClickSnapshotLink()");
    }

    return (
        <div className="bg-white rounded shadow-md border border-black border-opacity-5 overflow-hidden">
        <table className="">
            <tbody>
            <tr className="text-slate-800 bg-gray-300 text-medium">
                <th className="px-2 py-2 border border-black border-opacity-5 font-semibold text-sm">ID</th>
                <th className="border border-black border-opacity-5 font-semibold text-sm">Size</th>
                <th className="border border-black border-opacity-5 font-semibold text-sm">Trigger Time</th>
                <th className="border border-black border-opacity-5 font-semibold text-sm">First Sample Time</th>
                <th className="border border-black border-opacity-5 font-semibold text-sm">Last Sample Time</th>
                <th className="border border-black border-opacity-5 font-semibold text-sm">PV Names</th>
                <th className="border border-black border-opacity-5 font-semibold text-sm">Attributes</th>
            </tr>
            {snapshots?.map((snapshot, i) => {
                return (
                    <tr key={i} className="hover:bg-gray-100">
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
