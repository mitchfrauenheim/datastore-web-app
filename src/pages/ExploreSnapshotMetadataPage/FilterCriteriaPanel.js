import React from "react";

export default function FilterCriteriaPanel({filter, handleSubmitFunction}) {

    let snapshotMetadataFilter = filter;
    let handleSubmit = handleSubmitFunction;

    function renderFilterCriteriaPanel() {
        return (
            <div>
                <h1>Snapshot Metadata Query Filter Criteria</h1>
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
            {(snapshotMetadataFilter.criteriaList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
