import React from "react";
import SnapshotMetadataTableRow from "./SnapshotMetadataTableRow";
import {Link} from "react-router-dom";

export default function FilterCriteriaPanel({criteriaList, handleSubmitFunction}) {

    let criteriaDisplayList = criteriaList;
    let handleSubmit = handleSubmitFunction;

    function renderFilterCriteriaPanel() {
        return (
            <div>
                <h1>Snapshot Metadata Query Filter Criteria</h1>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Filter Clauses</th>
                        </tr>
                        {criteriaDisplayList?.map((criteria, i) => {
                            return (<tr key={i}><td>{criteria}</td></tr>);
                        })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }

    function renderNoFilterCriteriaPanel() {
        return (
            <div>
                <h1>Add snapshot metadata query filter criteria to begin.</h1>;
            </div>
        );
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            {(criteriaDisplayList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
