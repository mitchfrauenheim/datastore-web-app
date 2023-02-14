import React, {useRef} from "react";

export default function FilterEditPanel({ filter,
                                          updateCriteriaFunction,
                                          handleResetFunction }) {

    const firstTimeRef = useRef(null);
    const lastTimeRef = useRef(null);
    const pvPatternRef = useRef(null);

    function handleAddTimeRangeFilter() {
        console.log("FilterEditPanel.handleAddTimeRangeFilter()");
        filter.addTimeRangeCriteria(
            firstTimeRef.current.value, lastTimeRef.current.value);
        updateCriteriaFunction();
    }

    function handleAddPVFilter() {
        console.log("FilterEditPanel.handleAddPVFilter()");
        filter.addPvCriteria(pvPatternRef.current.value);
        updateCriteriaFunction();
    }

    function handleAllFilters() {
        filter.addTimeRangeCriteria(
            firstTimeRef.current.value, lastTimeRef.current.value);
        filter.addPvCriteria(pvPatternRef.current.value);
        updateCriteriaFunction();
    }

    return (
        <div className="filter-group-wrapper">
            <div className="filter-field-group">
                <label className="filter-label">Time Range:</label>
                    <input type="text" ref={firstTimeRef}
                           defaultValue={filter.minFirstTime}
                           className="mb-1 filter-input" />
                    <input type="text" ref={lastTimeRef}
                           defaultValue={filter.maxLastTime}
                           className="filter-input" />
            </div>
            <div className="filter-field-group">
                <label className="filter-label">PV Pattern:</label>
                    <input type="text" ref={pvPatternRef}
                           placeholder="PV name (e.g., mpexPv01 or *.*)"
                           defaultValue="mpexPv01"
                           className="filter-input" />
            </div>
            <div className="flex flex-col justify-center">
                <button onClick={handleAllFilters} className="mt-6 mb-1 apply-filters-button">
                    Add Filters
                </button>
                <button onClick={handleResetFunction} className="clear-filters-button">
                    Reset Filters
                </button>
            </div>
        </div>
    );

}
