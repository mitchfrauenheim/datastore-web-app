import {Link} from "react-router-dom";

export default function SnapshotsTableRow({ snapshot }) {

    return (
        <tr>
            <td><h3><Link to={`/snapshot?id=${snapshot.id}`}>{snapshot?.id || "No id"}</Link></h3></td>
            <td><h3><Link to={`/snapshot?id=${snapshot.id}`}>{snapshot?.snapshotTimestampSeconds || ""}</Link></h3></td>
            <td>{snapshot?.firstTimestampSeconds || ""}</td>
            <td>{snapshot?.lastTimestampSeconds || ""}</td>
        </tr>
    );
}