import SnapshotsTableRow from "./SnapshotsTableRow";

export default function SnapshotsTable({ snapshots = [] }) {

    return (
        <table>
            <tbody>
            <tr>
                <th>id</th>
                <th>timestamp</th>
                <th>first time</th>
                <th>last time</th>
            </tr>
            {snapshots?.map((snapshot, i) => {
                return <SnapshotsTableRow snapshot={snapshot} key={i} />;
            })}
            </tbody>
        </table>
    );
}
