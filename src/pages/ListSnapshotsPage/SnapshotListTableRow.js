import {Link} from "react-router-dom";

export default function SnapshotListTableRow({ snapshot }) {

    return (
        <tr>
            <td><Link to={`/snapshot?id=${snapshot.id}&first=${snapshot.firstTimestampSeconds}&last=${snapshot.lastTimestampSeconds}`}>{snapshot.id || "No id"}</Link></td>
            <td><Link to={`/snapshot?id=${snapshot.id}&first=${snapshot.firstTimestampSeconds}&last=${snapshot.lastTimestampSeconds}`}>{snapshot.snapshotTimestampLocaleString || ""}</Link></td>
            <td>{snapshot?.firstTimestampLocaleString || ""}</td>
            <td>{snapshot?.lastTimestampLocaleString || ""}</td>
            <td>{snapshot?.pvNamesString || ""}</td>
            <td style={{ whiteSpace: 'pre-line' }}>{snapshot?.descriptionString || ""}</td>
        </tr>
    );
}