import React, { useState, useEffect, useRef } from "react";
import TimestampCellRenderer from "../../components/ag-grid/TimestampCellRenderer";
import LinkCellRenderer from "../../components/ag-grid/LinkCellRenderer";
import PvNamesCellRenderer from "../../components/ag-grid/PvNamesCellRenderer";
import ItemListCellRenderer from "../../components/ag-grid/ItemListCellRenderer";
import { AgGridReact } from "ag-grid-react";
import PageSizeSelector from "../../components/PageSizeSelector";

export default function SnapshotListTable({ snapshots = [] }) {

    const gridRef = useRef();
    const [selected, setSelected] = useState();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: 'ID', cellRenderer: LinkCellRenderer, maxWidth: 70 },
        { field: 'Size', maxWidth: 100 },
        { field: 'Trigger Time', cellRenderer: TimestampCellRenderer, maxWidth: 150, autoHeight: true },
        { field: 'First Sample Time', cellRenderer: TimestampCellRenderer, maxWidth: 150 },
        { field: 'Last Sample Time', cellRenderer: TimestampCellRenderer, maxWidth: 150 },
        { field: 'PV Names', cellRenderer: PvNamesCellRenderer },
        { field: 'Attributes', cellRenderer: ItemListCellRenderer, maxWidth: 200, autoHeight: true }
    ]);

    const defaultColDef = {
        flex: 1,
    };

    function onGridReady() {
        let rowDataNew = []
        for (const [index, snapshot] of snapshots.entries()) {
            const newRow = {
                'ID': { path: `/snapshot?id=${snapshot.id}`, text: snapshot.id, },
                'Size': snapshot.size,
                'Trigger Time': { splitLines: true, timestamp: snapshot.snapshotTimestampDisplayString },
                'First Sample Time': { splitLines: true, timestamp: snapshot.firstTimestampDisplayString },
                'Last Sample Time': { splitLines: true, timestamp: snapshot.lastTimestampDisplayString },
                'PV Names': { pvNames: snapshot.pvNames, snapshotID: snapshot.id },
                'Attributes': { items: snapshot.attributePairStrings, path: `/snapshot?id=${snapshot.id}` },
            }
            rowDataNew.push(newRow)
        }
        setRowData(rowDataNew);
    }

    useEffect(() => {
        let rowDataNew = []
        for (const [index, snapshot] of snapshots.entries()) {
            const newRow = {
                'ID': { path: `/snapshot?id=${snapshot.id}`, text: snapshot.id, },
                'Size': snapshot.size,
                'Trigger Time': { splitLines: true, timestamp: snapshot.snapshotTimestampDisplayString },
                'First Sample Time': { splitLines: true, timestamp: snapshot.firstTimestampDisplayString },
                'Last Sample Time': { splitLines: true, timestamp: snapshot.lastTimestampDisplayString },
                'PV Names': { pvNames: snapshot.pvNames, snapshotID: snapshot.id },
                'Attributes': { items: snapshot.attributePairStrings, path: `/snapshot?id=${snapshot.id}` },
            }
            rowDataNew.push(newRow)
        }
        setRowData(rowDataNew);
    }, [snapshots])

    function handleClickSnapshotLink(snapshot) {
        console.log("SnapshotListTableRow.handleClickSnapshotLink()");
    }

    return (
        <div className="grid-section-wrapper">
            <PageSizeSelector
                options={[10,50,100,500]}
                gridRef={gridRef}
                setSelected={setSelected}
            />
            <div className="grid-wrapper ag-theme-material ag-theme-tight">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    defaultColDef={defaultColDef}
                    gridAutoWidth={false}
                    pagination={true}
                    paginationPageSize={10}
                ></AgGridReact>
            </div>
        </div>
    );
}
