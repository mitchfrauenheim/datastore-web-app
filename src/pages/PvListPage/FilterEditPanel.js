import React, {useRef} from "react";

export default function FilterEditPanel({filter, updateCriteriaFunction}) {

    const attributeNameRef = useRef(null);
    const attributeValueRef = useRef(null);
    const pvPatternRef = useRef(null);

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

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>PV List Filter</h1>
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
