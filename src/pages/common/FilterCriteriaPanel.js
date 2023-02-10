import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FilterCriteriaPanel({
    criteriaList,
    handleSubmitFunction,
    handleResetFunction,
    handleDeleteCriteriaFunction,
    heading,
    beginPrompt
}) {
    const [disabled, setDisabled] = useState(false);

    function renderFilterCriteriaPanel() {
        return (
            <div>
                <div id="submit-filters" className="mt-4">
                <button className="h-8 w-32 px-2 rounded bg-slate-800 text-white text-sm font-medium shadow-md transition duration-100 hover:bg-slate-600"
                        disabled={false}
                        onClick={handleSubmitFunction}>
                    Submit Filters
                </button>
            </div>
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
                <div id="submit-filters-disabled" className="mt-4">
                <button className="h-8 w-32 px-2 rounded bg-gray-300 text-gray-500 text-sm font-medium shadow-md"
                        disabled={true}>
                    Submit Filters
                </button>
            </div>
                <h1>{beginPrompt}</h1>
            </div>
        );
    }

    return (
        <div>
            
            {(criteriaList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
