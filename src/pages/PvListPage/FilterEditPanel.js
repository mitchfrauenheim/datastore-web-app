import React, {useRef} from "react";

export default function FilterEditPanel({filter, updateCriteriaFunction}) {

    const attributeNameRef = useRef(null);
    const attributeValueRef = useRef(null);
    const pvPatternRef = useRef(null);

    function handleAddPVFilter() {
        console.log("FilterEditPanel.handleAddPVFilter()");
        filter.addOrUpdatePvCriteria(pvPatternRef.current.value);
        updateCriteriaFunction();
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>PV List Filter</h1>
            <div>
                <label>
                    PV filter
                    <input type="text" ref={pvPatternRef}
                           placeholder="PV name (e.g., 'mpexPv09' or 'mpexPv0*')"
                           defaultValue="mpex*"/>
                    <button onClick={handleAddPVFilter}>
                        {filter.singlePvCriteriaButtonLabel}
                    </button>
                </label>
            </div>
        </div>
    );

}
