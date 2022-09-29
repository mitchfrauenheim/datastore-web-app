import React from "react";
import SnapshotListTableRow from "./SnapshotListTableRow";
import {Link} from "react-router-dom";

export default function FilterCriteriaPanel({criteriaList, handleSubmitFunction}) {

    let criteriaDisplayList = criteriaList;
    let handleSubmit = handleSubmitFunction;

    function renderFilterCriteriaPanel() {
        return (
            <div>
                <h1>Snapshot List Filter Criteria</h1>
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
                    <button onClick={handleSubmit}>Submit Filter</button>
                </div>
            </div>
        );
    }

    function renderNoFilterCriteriaPanel() {
        return (
            <div>
                <h1>To begin, add criteria to snapshot list filter.</h1>
            </div>
        );
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            {(criteriaDisplayList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
