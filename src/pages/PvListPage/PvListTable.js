import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import LinkCellRenderer from "../../components/ag-grid/LinkCellRenderer";
import TimestampCellRenderer from "../../components/ag-grid/TimestampCellRenderer";
import ItemListCellRenderer from "../../components/ag-grid/ItemListCellRenderer";
import PageSizeSelector from "../../components/PageSizeSelector";

export default function PvListTable({ pvs = [] }) {

    const gridRef = useRef();
    const [setSelected] = useState();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: 'PV Name', cellRenderer: LinkCellRenderer },
        { field: 'First Time', cellRenderer: TimestampCellRenderer, autoHeight: true },
        { field: 'Last Time', cellRenderer: TimestampCellRenderer },
        { field: 'Provider ID' },
        { field: 'Fields', cellRenderer: ItemListCellRenderer, autoHeight: true },
        { field: 'Attributes', cellRenderer: ItemListCellRenderer, autoHeight: true }
    ]);

    const defaultColDef = {
        flex: 1,
    };

    useEffect(() => {
        let rowDataNew = []
        for (const [index, pv] of pvs.entries()) {
            const newRow = {
                'PV Name': { path: `/pv?name=${pv.name}`, text: pv.name },
                'First Time': { splitLines: true, timestamp: pv.firstTimestampDisplayString },
                'Last Time': { splitLines: true, timestamp: pv.lastTimestampDisplayString },
                'Provider ID': pv.providerId,
                'Fields': { items: pv.fieldNameTypeStringList, path: `/pv?name=${pv.name}` },
                'Attributes': { items: pv.attributeNameList, path: `/pv?name=${pv.name}` }
            }
            rowDataNew.push(newRow)
        }
        setRowData(rowDataNew)
    }, [pvs])

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
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                ></AgGridReact>
            </div>
        </div>
    );
}
