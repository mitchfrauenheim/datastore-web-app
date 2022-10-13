import {Link} from "react-router-dom";
import SnapshotDetails from "../../domain/models/SnapshotDetails";

export default function SnapshotListTableRow({ snapshot }) {

    function handleClickSnapshotLink(snapshot) {
        console.log("SnapshotListTableRow.handleClickSnapshotLink()");
        // save selected snapshot to window storage for access in ViewSnapshotPage
        window.localStorage.setItem("snapshot", JSON.stringify(new SnapshotDetails(snapshot.id, snapshot.snapshotTimestampLocaleString, snapshot.firstTimestampLocaleString, snapshot.lastTimestampLocaleString, snapshot.pvNamesString, snapshot.descriptionString)));
    }

    return (
        <tr>
            <td>
                <Link
                    onClick={() => handleClickSnapshotLink(snapshot)}
                    to={`/snapshot?id=${snapshot.id}}`}>
                    {snapshot.id || "No id"}
                </Link>
            </td>
            <td>
                <Link
                    onClick={() => handleClickSnapshotLink(snapshot)}
                    to={`/snapshot?id=${snapshot.id}}`}>
                    {snapshot.snapshotTimestampLocaleString || ""}
                </Link>
            </td>
            <td>{snapshot?.firstTimestampLocaleString || ""}</td>
            <td>{snapshot?.lastTimestampLocaleString || ""}</td>
            <td>{snapshot?.pvNamesString || ""}</td>
            <td style={{ whiteSpace: 'pre-line' }}>{snapshot?.descriptionString || ""}</td>
        </tr>
    );
}