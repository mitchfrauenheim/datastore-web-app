import React, {useRef} from "react";

export default function FilterEditPanel({filter, updateCriteriaFunction}) {

    let snapshotMetadataFilter = filter;
    let updateCriteria = updateCriteriaFunction;

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    function handleAddTimeRangeFilter() {
        console.log("adding time range filter criteria");
        snapshotMetadataFilter.addTimeRangeCriteria(input1Ref, input2Ref);
        updateCriteria();
    }

    // TODO: using defaultValue in input fields for now to hardwire some meaningful values,
    // remove and just use placeholder instead
    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <h1>Edit Snapshot Metadata Query Filter</h1>
            <div>
                <label>
                    time range filter
                    <input type="text" ref={input1Ref}
                           placeholder="2022-09-21T03:03:19.000Z"
                           defaultValue="2022-09-21T03:03:19.000Z"/>
                    <input type="text" ref={input2Ref}
                           placeholder="2022-09-21T03:03:19.999Z"
                           defaultValue="2022-09-21T03:03:19.999Z"/>
                    <button onClick={handleAddTimeRangeFilter}>Add</button>
                </label>
            </div>
        </div>
    );

}
