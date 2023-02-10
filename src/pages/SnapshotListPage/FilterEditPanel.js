import React, { useRef } from "react";

export default function FilterEditPanel({ filter,
                                          updateCriteriaFunction,
                                          handleResetFunction }) {

    const firstTimeRef = useRef(null);
    const lastTimeRef = useRef(null);
    const attributeNameRef = useRef(null);
    const attributeValueRef = useRef(null);
    const pvPatternRef = useRef(null);

    function handleAddTimeRangeFilter() {
        console.log("FilterEditPanel.handleAddTimeRangeFilter()");
        filter.addTimeRangeCriteria(
            firstTimeRef.current.value, lastTimeRef.current.value);
        updateCriteriaFunction();
    }

    function handleAddAttributeFilter() {
        console.log("FilterEditPanel.handleAddAttributeFilter()");
        filter.addAttributeCriteria(
            attributeNameRef.current.value, attributeValueRef.current.value);
        updateCriteriaFunction();
    }

    function handleAddPVFilter() {
        console.log("FilterEditPanel.handleAddPVFilter()");
        filter.addPvCriteria(pvPatternRef.current.value);
        updateCriteriaFunction();
    }

    function handleAllFilters() {
        if (firstTimeRef.current.value && lastTimeRef.current.value) {
            filter.addTimeRangeCriteria(firstTimeRef.current.value, lastTimeRef.current.value);
        }
        if (attributeNameRef.current.value && attributeValueRef.current.value) {
            filter.addAttributeCriteria(attributeNameRef.current.value, attributeValueRef.current.value);
        }
        if (pvPatternRef.current.value) {
            filter.addPvCriteria(pvPatternRef.current.value);
        }
        updateCriteriaFunction();
    }

    // TODO: using defaultValue in input fields for now to hardwire some meaningful values,
    // remove and just use placeholder instead
    return (
        <div className="flex flex-col md:flex-row flex-wrap justify-between">
            
            <div id="time-field-group" className="filter-field-group">
                <label className="filter-label">Time Range:</label>
                <input type="text" ref={firstTimeRef}
                    placeholder="2022-09-21T03:03:19.000Z"
                    defaultValue="2022-10-28T15:43:07.000Z"
                    className="mb-1 filter-input" />
                <input type="text" ref={lastTimeRef}
                    placeholder="2022-09-21T03:03:19.999Z"
                    defaultValue="2022-10-28T15:43:07.999Z"
                    className="filter-input" />
            </div>

            <div id="attribute-field-group" className="filter-field-group">
                <label className="filter-label">Attribute:</label>
                <input type="text" ref={attributeNameRef}
                    placeholder="e.g. 'classification')"
                    defaultValue="classification"
                    className="mb-1 filter-input" />
                <input type="text" ref={attributeValueRef}
                    placeholder="e.g.'test'"
                    defaultValue="dev"
                    className="filter-input" />
            </div>

            <div id="pv-field-group" className="filter-field-group">
                <label className="filter-label">PV Pattern:</label>
                <input type="text" ref={pvPatternRef}
                    placeholder="e.g. 'mpexPv09' or 'mpexPv0*'"
                    className="filter-input" />
            </div>

            <div className="flex flex-col justify-center">
                {/* <label className="filter-label"></label> */}
                <button onClick={handleAllFilters} className="mt-6 mb-1 apply-filters-button">
                    Apply Filters
                </button>
                <button className="clear-filters-button" onClick={handleResetFunction}>
                    Clear Filters
                </button>
            </div>
        </div>
    );

}
