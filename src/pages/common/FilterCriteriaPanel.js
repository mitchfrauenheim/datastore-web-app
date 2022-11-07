import React from "react";
import {Link} from "react-router-dom";

export default function FilterCriteriaPanel({
                                                criteriaList,
                                                handleSubmitFunction,
                                                handleResetFunction,
                                                handleDeleteCriteriaFunction,
                                                heading,
                                                beginPrompt}) {

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
                        {criteriaList?.map((criteria, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {criteria.displayString}
                                        &nbsp;
                                        <button onClick={(e) => handleDeleteCriteriaFunction(criteria)}>
                                            remove
                                        </button>
                                    </td>
                                </tr>);
                        })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={handleResetFunction}>Reset Filter</button>
                    <button onClick={handleSubmitFunction}>Submit Filter</button>
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
            {(criteriaList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
