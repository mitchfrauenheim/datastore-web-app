import React from "react";
import { Link } from "react-router-dom";

export default function PvNamesWithLinksParagraph(props) {
    if (props.objectWithPvs.pvNames.length < 3 || props.showAll) {
        return (
            <p>
                {props.objectWithPvs.pvNames?.map((pvName, i) => {
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
    const firstTwo = [props.objectWithPvs.pvNames[0], props.objectWithPvs.pvNames[1]]
    const remaining = props.objectWithPvs.pvNames.length - 2
    return (
        <>
        {firstTwo?.map((pvName, i) => {
            return(
                <Link key={i} to={`/pv?name=${pvName}`}>
                    {pvName}
                </Link>
            )
        }).reduce((prev, curr) => [prev, ", ", curr])}
        ... <Link to={`/snapshot?id=${props.snapshotID}`}>+{remaining}</Link>
        </>
    );
}
