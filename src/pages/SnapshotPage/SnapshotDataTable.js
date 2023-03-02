import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import NanosTimestampCellRenderer from "../../components/ag-grid/NanosTimestampCellRenderer";
import PageSizeSelector from "../../components/PageSizeSelector";

export default function SnapshotDataTable({ snapshotDataPage }) {

    const gridRef = useRef();
    const [selected, setSelected] = useState();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState()

    useEffect(() => {
        let colDefNew = []
        for (const [index, label] of snapshotDataPage.labelsList.entries()) {
            const newCol = { field: label, autoHeight: true };
            if (label == "timestamp") {
                newCol['autoHeight'] = true;
                newCol['cellRenderer'] = NanosTimestampCellRenderer;
                newCol['pinned'] = 'left';
            }
            colDefNew.push(newCol);
        }
        setColumnDefs(colDefNew);

        let rowDataNew = []
        for (const [index, snapshotDataRow] of snapshotDataPage.snapshotDataRowList.entries()) {
            let newRow = {}
            newRow[snapshotDataPage.labelsList[0]] = {
                'timestampLocaleString': snapshotDataRow.timestampLocaleString,
                'timestampNanos': snapshotDataRow.timestampNanos
            }
            for (const [index, columnValue] of snapshotDataRow.columnValueList.entries()) {
                newRow[snapshotDataPage.labelsList[index + 1]] = columnValue;
            }
            rowDataNew.push(newRow);
        }
        setRowData(rowDataNew);
    }, [snapshotDataPage])

    return (
        <div className="table-wrapper ag-theme-material">
            <PageSizeSelector
                options={[10, 50, 100, 500]}
                gridRef={gridRef}
                setSelected={setSelected}
            />
            <div className="grid-wrapper">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                ></AgGridReact>
            </div>
        </div>
    );
}
