export default function SnapshotsTableRow({ snapshot, onOpen }) {

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