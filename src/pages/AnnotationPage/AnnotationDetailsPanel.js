import React from "react";

export default function AnnotationDetailsPanel({annotation}) {

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Annotation Details</h1>
            <b>Name: </b><p>{annotation.name}</p>
            <b>Query: </b><p>{annotation.query}</p>
        </div>
    );

}
