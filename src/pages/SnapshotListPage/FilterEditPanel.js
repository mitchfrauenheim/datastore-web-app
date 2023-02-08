import React, { useRef } from "react";

export default function FilterEditPanel({ filter, updateCriteriaFunction }) {

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

    // TODO: using defaultValue in input fields for now to hardwire some meaningful values,
    // remove and just use placeholder instead
    return (
        <div className="flex flex-row justify-between">
            <div className="">
                <label className="block">time range filter</label>
                <input type="text" ref={firstTimeRef}
                       placeholder="2022-09-21T03:03:19.000Z"
                       defaultValue="2022-10-28T15:43:07.000Z"
                       className="block" />
                <input type="text" ref={lastTimeRef}
                       placeholder="2022-09-21T03:03:19.999Z"
                       defaultValue="2022-10-28T15:43:07.999Z" />
                <button onClick={handleAddTimeRangeFilter}>
                    {filter.timeRangeCriteriaButtonLabel}
                </button>
            </div>
            <div className="bg-green-200">
                <label className="block">attribute filter</label>
                <input type="text" ref={attributeNameRef}
                       placeholder="attribute name ('classification')"
                       defaultValue="classification"
                       className="block" />
                <input type="text" ref={attributeValueRef}
                       placeholder="attribute value ('test')"
                       defaultValue="dev" />
                <button onClick={handleAddAttributeFilter}>Add</button>
            </div>
            <div className="bg-blue-300">
                <label className="block">PV filter</label>
                <input type="text" ref={pvPatternRef}
                       placeholder="PV name (e.g., 'mpexPv09' or 'mpexPv0*')" />
                <button onClick={handleAddPVFilter}>Add</button>
            </div>
        </div>
    );

}
