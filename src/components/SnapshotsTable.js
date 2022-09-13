import SnapshotsTableRow from "./SnapshotsTableRow";

export default function SnapshotsTable({ snapshots = [], onOpen }) {

    return (
        <table>
            <tbody>
            <tr>
                <th>id</th>
                <th>timestamp</th>
                <th>description</th>
            </tr>
            {snapshots?.map((snapshot, i) => {
                return <SnapshotsTableRow snapshot={snapshot} key={i} onOpen={onOpen}/>;
            })}
            </tbody>
        </table>
    );
}
