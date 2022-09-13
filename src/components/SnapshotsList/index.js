import "./SnapshotsList.css";

export default function SnapshotsList({ snapshots = [], onOpen }) {

    return (
        <table>
            <tbody>
                <tr>
                    <th>id</th>
                    <th>timestamp</th>
                    <th>description</th>
                </tr>
                {snapshots?.map((snapshot, i) => {
                    return <Snapshot snapshot={snapshot} key={i} onOpen={onOpen}/>;
                })}
            </tbody>
        </table>
    );
}

function Snapshot({ snapshot, onOpen }) {

    function handleOpen() {
        console.log("open snapshot");
        onOpen(snapshot)
    }

    return (
        <tr>
            <td><h3>{snapshot?.id || "No id"}</h3></td>
            <td><h3>{snapshot?.timestamp || ""}</h3></td>
            <td><h3>{snapshot?.description || ""}</h3></td>
            <td><button onClick={handleOpen}>Open</button></td>
        </tr>
    );
}