import {Link} from "react-router-dom";

export default function SnapshotsTableRow({ snapshot }) {

    return (
        <tr>
            <td><h3><Link to={`/snapshot?id=${snapshot.id}`}>{snapshot?.id || "No id"}</Link></h3></td>
            <td><h3><Link to={`/snapshot?id=${snapshot.id}`}>{snapshot?.timestamp || ""}</Link></h3></td>
            <td>{snapshot?.first || ""}</td>
            <td>{snapshot?.last || ""}</td>
        </tr>
    );
}