import React, {useRef} from "react";
import PageTitle from "../../components/PageTitle";

export default function FilterEditPanel({filter, updateCriteriaFunction}) {

    const attributeNamePatternRef = useRef(null);

    function handleAddAnnotationFilter() {
        console.log("FilterEditPanel.handleAddAnnotationFilter()");
        filter.addAnnotationCriteria(attributeNamePatternRef.current.value);
        updateCriteriaFunction();
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            <PageTitle pageName={"Annotation List Filter"} />
            <div>
                <label>
                    Annotation filter
                    <input type="text" ref={attributeNamePatternRef}
                           placeholder="Annotation name pattern (e.g., 'power failure')"/>
                    <button onClick={handleAddAnnotationFilter}>
                        {filter.annotationCriteriaButtonLabel}
                    </button>
                </label>
            </div>
        </div>
    );

}
