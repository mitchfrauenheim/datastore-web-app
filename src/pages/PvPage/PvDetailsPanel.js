import React from "react";

export default function PvDetailsPanel({ pv }) {

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>PV Details</h1>
            <b>Name: </b><p>{pv.name}</p>
        </div>
    );

}
