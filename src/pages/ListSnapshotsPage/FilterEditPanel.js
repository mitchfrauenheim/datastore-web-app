import React, {useRef} from "react";

export default function FilterEditPanel({filter, updateCriteriaFunction}) {

    let snapshotMetadataFilter = filter;
    let updateCriteria = updateCriteriaFunction;

    const firstTimeRef = useRef(null);
    const lastTimeRef = useRef(null);
    const attributeNameRef = useRef(null);
    const attributeValueRef = useRef(null);
    const pvPatternRef = useRef(null);

    function handleAddTimeRangeFilter() {
        console.log("FilterEditPanel.handleAddTimeRangeFilter()");
        snapshotMetadataFilter.addTimeRangeCriteria(firstTimeRef.current.value, lastTimeRef.current.value);
        updateCriteria();
    }

    function handleAddAttributeFilter() {
        console.log("FilterEditPanel.handleAddAttributeFilter()");
        snapshotMetadataFilter.addAttributeCriteria(attributeNameRef.current.value, attributeValueRef.current.value);
        updateCriteria();
    }

    function handleAddPVFilter() {
        console.log("FilterEditPanel.handleAddPVFilter()");
        snapshotMetadataFilter.addPvCriteria(pvPatternRef.current.value);
        updateCriteria();
    }

    // TODO: using defaultValue in input fields for now to hardwire some meaningful values,
    // remove and just use placeholder instead
    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Snapshot List Filter</h1>
            <div>
                <label>
                    time range filter
                    <input type="text" ref={firstTimeRef}
                           placeholder="2022-09-21T03:03:19.000Z"
                           defaultValue="2022-09-21T03:03:19.000Z"/>
                    <input type="text" ref={lastTimeRef}
                           placeholder="2022-09-21T03:03:19.999Z"
                           defaultValue="2022-09-21T03:03:19.999Z"/>
                    <button onClick={handleAddTimeRangeFilter}>Add</button>
                </label>
            </div>
            <div>
                <label>
                    attribute filter
                    <input type="text" ref={attributeNameRef}
                           placeholder="attribute name ('classification')"/>
                    <input type="text" ref={attributeValueRef}
                           placeholder="attribute value ('test')"/>
                    <button onClick={handleAddAttributeFilter}>Add</button>
                </label>
            </div>
            <div>
                <label>
                    PV filter
                    <input type="text" ref={pvPatternRef}
                           placeholder="PV name (e.g., 'mpexPv09' or 'mpexPv0*')"/>
                    <button onClick={handleAddPVFilter}>Add</button>
                </label>
            </div>
        </div>
    );

}
