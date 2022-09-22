import SnapshotDataTableRow from "./SnapshotDataTableRow";

export default function SnapshotDataTable({ snapshotDataPage }) {

    return (
        <table>
            <tbody>
            <tr>
                {snapshotDataPage?.labelsList.map((label, i) => {
                    return <th key={i}>{label}</th>;
                })}
            </tr>
            {snapshotDataPage?.snapshotDataRowList.map((snapshotDataRow, i) => {
                return <SnapshotDataTableRow snapshotDataRow={snapshotDataRow} key={i} />;
            })}
            </tbody>
        </table>
    );
}
