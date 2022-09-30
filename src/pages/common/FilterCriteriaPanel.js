import React from "react";

export default function FilterCriteriaPanel({criteriaList, handleSubmitFunction, heading, beginPrompt}) {

    let criteriaDisplayList = criteriaList;
    let handleSubmit = handleSubmitFunction;

    function renderFilterCriteriaPanel() {
        return (
            <div>
                <h1>{heading}</h1>
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
                <h1>{beginPrompt}</h1>
            </div>
        );
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            {(criteriaDisplayList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
