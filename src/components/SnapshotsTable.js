import SnapshotsTableRow from "./SnapshotsTableRow";

export default function SnapshotsTable({ snapshots = [] }) {

    return (
        <table>
            <tbody>
            <tr>
                <th>Snapshot ID</th>
                <th>Trigger Time</th>
                <th>First Sample Time</th>
                <th>Last Sample Time</th>
                <th>PV Names</th>
                <th>Description</th>
            </tr>
            {snapshots?.map((snapshot, i) => {
                return <SnapshotsTableRow snapshot={snapshot} key={i} />;
            })}
            </tbody>
        </table>
    );
}
