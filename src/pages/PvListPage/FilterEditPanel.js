import React, { useRef } from "react";

export default function FilterEditPanel({ filter, updateCriteriaFunction }) {

    const attributeNameRef = useRef(null);
    const attributeValueRef = useRef(null);
    const pvPatternRef = useRef(null);

    function handleAddPVFilter() {
        console.log("FilterEditPanel.handleAddPVFilter()");
        filter.addOrUpdatePvCriteria(pvPatternRef.current.value);
        updateCriteriaFunction();
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between">
            <div id="pv-field" className="flex flex-col mb-4 sm:mb-0">
                <label className="filter-label">PV filter</label>
                <input type="text" ref={pvPatternRef}
                    placeholder="PV name (e.g., 'mpexPv09' or 'mpexPv0*')"
                    defaultValue="mpex*"
                    className="filter-input" />
            </div>
            <div className="flex flex-row space-x-2 justify-center">
                <button onClick={handleAddPVFilter} className="mt-6 apply-filters-button">
                    {/* {filter.singlePvCriteriaButtonLabel} */}
                    Apply Filter
                </button>
                <button className="mt-6 clear-filters-button">
                    Clear Filter
                </button>
            </div>
        </div>
    );

}
