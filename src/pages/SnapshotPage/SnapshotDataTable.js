export default function SnapshotDataTable({ snapshotDataPage }) {

    return (
        <table className="table-with-border">
            <tbody>
            <tr>
                {snapshotDataPage?.labelsList.map((label, i) => {
                    return <th key={i}>{label}</th>;
                })}
            </tr>
            {snapshotDataPage?.snapshotDataRowList.map((snapshotDataRow, i) => {
                return (
                    <tr key={i}>
                        <td>{snapshotDataRow?.timestampLocaleString || ""} {snapshotDataRow?.timestampNanos}</td>
                        {snapshotDataRow?.columnValueList.map((columnValue, j) => {
                            return <td key={j}>{columnValue}</td>;
                        })}

                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
