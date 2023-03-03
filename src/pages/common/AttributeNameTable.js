import React from "react";
import { Link } from "react-router-dom";

export default function AttributeNameTable(props) {
    if (props.objectWithAttributes.attributeNameList.length < 3 || props.showAll) {
        return (
            <div>
                {props.objectWithAttributes.attributeNameList?.map((attributeName, i) => {
                    const comma = i < props.objectWithAttributes.attributeNameList.length-1 ? "," : "";
                    return (
                        
                        <div key={i}>
                            {attributeName}{comma}
                        </div>
                    );
                })}
            </div>
        );
    }
    const firstTwo = [props.objectWithAttributes.attributeNameList[0], props.objectWithAttributes.attributeNameList[1]];
    const remaining = props.objectWithAttributes.attributeNameList.length - 2; 
    return (
        <>
            {firstTwo.map((attributeName, i) => {
                const comma = i < 1 ? "," : "";
                return(
                    <div key={i}>
                        {attributeName}{comma}
                    </div>
                );
            })}
            <div className="tooltip font-medium" data-tip="Redirects to PV page"><Link to={`/pv?name=${props.pvName}`}>+{remaining} more</Link></div>
        </>
    )
}
