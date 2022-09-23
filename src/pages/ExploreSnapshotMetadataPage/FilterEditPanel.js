import React from "react";

export default function FilterEditPanel({filter}) {

    let snapshotMetadataFilter = filter;

    function handleAdd() {
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Edit Snapshot Metadata Query Filter</h1>
            <div>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );

}
