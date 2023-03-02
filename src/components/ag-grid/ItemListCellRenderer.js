import React from "react";
import { Link } from "react-router-dom";

export default function ItemListCellRenderer(props) {
    if (props.value.items?.length < 3) {
        return (
            <div className="flex flex-col">
                {props.value.items?.map((pairString, i) => {
                    return (
                        <div key={i}>
                            {pairString.replace(" =>", ":")}
                        </div>
                    );
                })}
            </div>
        );
    }
    const firstTwo = [props.value.items[0], props.value.items[1]];
    const remaining = props.value.items.length - 2;
    return (
        <>
            {firstTwo.map((pairString, i) => {
                return (
                    <div key={i}>
                        {pairString.replace(" =>", ":")}
                    </div>

                );
            })}
            <div className="font-medium"><Link to={props.value.path}>+{remaining} more</Link></div>
        </>
    );
}