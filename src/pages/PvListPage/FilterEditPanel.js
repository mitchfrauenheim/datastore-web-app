import React, {useRef} from "react";
import NavBar from "../../components/NavBar";

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
            <NavBar pageName={"PV List Filter"} />
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
