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
                {/* <h1>{heading}</h1> */}
                <div className="filter-label">
                    Applied Filters:
                </div>
                <div>
                    {criteriaList?.map((criteria, i) => {
                        return (
                            <div className="badge font-medium text-slate-500 bg-gray-200 border-gray-200 cursor-default mr-2">
                                {criteria.displayString}
                                &nbsp;
                                <button onClick={(e) => handleDeleteCriteriaFunction(criteria)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}

                </div>
                <div id="submit-filters" className="mt-2">
                    <button className="h-8 w-32 px-2 rounded bg-slate-800 text-white text-sm font-medium shadow-md transition duration-100 hover:bg-slate-600"
                        disabled={false}
                        onClick={handleSubmitFunction}>
                        Submit Filters
                    </button>
                </div>
            </div>
        );
    }

    function renderNoFilterCriteriaPanel() {
        return (
            <div>
                {/* <h1>{beginPrompt}</h1> */}
                <div className="filter-label">
                    Applied Filters:
                </div>
                <div id="submit-filters-disabled" className="mt-2">
                    <button className="h-8 w-32 px-2 rounded bg-gray-300 text-gray-500 text-sm font-medium shadow-md"
                        disabled={true}>
                        Submit Filters
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {(criteriaList.length === 0) ? renderNoFilterCriteriaPanel() : renderFilterCriteriaPanel()}
        </div>
    );

}
