export default function SnapshotDataTableRow({ snapshotDataRow }) {

    return (
        <tr>
            <td>{snapshotDataRow?.timestampLocaleString || ""} {snapshotDataRow?.timestampNanos}</td>
            {snapshotDataRow?.columnValueList.map((columnValue, i) => {
                return <td key={i}>{columnValue}</td>;
            })}

        </tr>
    );
}