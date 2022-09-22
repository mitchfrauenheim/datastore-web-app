import React from "react";

export default function FilterPanel({}) {

    function handleSubmit() {
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Filter Snapshot Data</h1>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );

}
