import React, { useRef } from "react";

export default function FilterEditPanel({ filter,
                                          updateCriteriaFunction,
                                          handleResetFunction
                                        }) {

    const attributeNameRef = useRef(null);
    const attributeValueRef = useRef(null);
    const pvPatternRef = useRef(null);

    function handleAddPVFilter() {
        console.log("FilterEditPanel.handleAddPVFilter()");
        filter.addOrUpdatePvCriteria(pvPatternRef.current.value);
        updateCriteriaFunction();
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div id="pv-field" className="filter-field-group">
                <label className="filter-label">PV Pattern:</label>
                <input type="text" ref={pvPatternRef}
                    placeholder="e.g. 'mpexPv09' or 'mpexPv0*'"
                    defaultValue="mpex*"
                    className="filter-input" />
            </div>
            <div className="flex flex-row pt-2 md:pt-6 space-x-2 justify-center">
                <button onClick={handleAddPVFilter} className="apply-filters-button">
                    {/* {filter.singlePvCriteriaButtonLabel} */}
                    Apply Filter
                </button>
                <button className="clear-filters-button" onClick={handleResetFunction}>
                    Clear Filter
                </button>
            </div>
        </div>
    );

}
