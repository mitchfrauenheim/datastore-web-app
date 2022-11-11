import {Link} from "react-router-dom";
import React from "react";

export default function AnnotationListTable({ annotationList = [] }) {

    return (
        <table className="table-with-border">
            <tbody>
            <tr>
                <th>Annotation Name</th>
                <th>Query</th>
            </tr>
            {annotationList?.map((annotation, i) => {
                return (
                    <tr key={i}>
                        <td>
                            <Link
                                to={`/annotation?name=${annotation.name}`}>
                                {annotation.name}
                            </Link>
                        </td>
                        <td> { annotation.query }</td>
                    </tr>);
            })}
            </tbody>
        </table>
    );
}
