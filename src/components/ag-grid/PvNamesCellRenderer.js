import React from "react";
import { Link } from "react-router-dom";

export default function PvNamesCellRenderer(props) {
    if (props.value.pvNames.length < 3) {
        return (
            <p>
                {props.value.pvNames?.map((pvName, i) => {
                    return (
                        <Link key={i} to={`/pv?name=${pvName}`}>
                            {pvName}
                        </Link>
                    );
                })
                    .reduce((prev, curr) => [prev, ", ", curr])}
            </p>

        );
    }
    const firstTwo = [props.value.pvNames[0], props.value.pvNames[1]]
    const remaining = props.value.pvNames.length - 2
    return (
        <>
        {firstTwo?.map((pvName, i) => {
            return(
                <Link key={i} to={`/pv?name=${pvName}`}>
                    {pvName}
                </Link>
            )
        }).reduce((prev, curr) => [prev, ", ", curr])}
        ... <div className="tooltip font-medium" data-tip="Redirects to snapshot page"><Link to={`/snapshot?id=${props.value.snapshotID}`}>+{remaining} more</Link></div>
        </>
    );
}