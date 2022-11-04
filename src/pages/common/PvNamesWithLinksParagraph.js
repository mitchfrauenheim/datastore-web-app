import React from "react";
import {Link} from "react-router-dom";

export default function PvNamesWithLinksParagraph({objectWithPvs}) {

    return (
        <p>
            {objectWithPvs.pvNames?.map((pvName, i) => {
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
