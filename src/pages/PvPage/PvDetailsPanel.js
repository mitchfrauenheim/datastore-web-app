import React from "react";
import FieldNameTypeTable from "../common/FieldNameTypeTable";
import AttributeNameTable from "../common/AttributeNameTable";
import {Link} from "react-router-dom";

export default function PvDetailsPanel({pv}) {

        return (
            <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                    <h1>PV Details</h1>
                    <b>Name: </b>
                    <p>
                            {pv.name + ' '}
                            <Link to={`/snapshotList?pvPattern1=${pv.name}`}>
                                    (view snapshots)
                            </Link>
                    </p>
                    <b>First Time: </b><p>{pv.firstTimestampDisplayString}</p>
                    <b>Last Time: </b><p>{pv.lastTimestampDisplayString}</p>
                    <b>Provider ID: </b><p>{pv.providerId}</p>
                    <div></div>
                    <b>Field Names and Types:</b>
                    <p/>
                    <FieldNameTypeTable objectWithFields={pv}/>
                    <p/>
                    <b>Attributes: </b>
                    <p/>
                    <AttributeNameTable objectWithAttributes={pv}/>
                    <p/>
            </div>
        );

}
