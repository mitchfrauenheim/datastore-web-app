import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import LinkCellRenderer from "../../components/ag-grid/LinkCellRenderer";
import PageSizeSelector from "../../components/PageSizeSelector";

export default function AnnotationListTable({ annotationList = [] }) {

    const gridRef = useRef();
    const [selected, setSelected] = useState();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: 'Annotation Name', cellRenderer: LinkCellRenderer, maxWidth: 200 },
        { field: 'Query', autoHeight: true }
    ])

    const defaultColDef = {
        flex: 1
    };

    useEffect(() => {
        let rowDataNew = []
        for (const [index, annotation] of annotationList.entries()) {
            const newRow = {
                'Annotation Name': { path: `/annotation?name=${annotation.name}`, text: annotation.name },
                'Query': annotation.query
            }
            rowDataNew.push(newRow)
        }
        setRowData(rowDataNew)
    }, [annotationList])

    return (
        <div className="grid-section-wrapper ">
            <PageSizeSelector
                options={[10,50,100,500]}
                gridRef={gridRef}
                setSelected={setSelected}
            />
            <div className="grid-wrapper ag-theme-material">
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
    )
}
