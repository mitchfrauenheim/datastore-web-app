import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { XCircleIcon } from '@heroicons/react/20/solid'

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
                                    <XCircleIcon className="w-3.5 h-3.5" />
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
