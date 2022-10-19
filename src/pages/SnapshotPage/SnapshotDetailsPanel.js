import {epochSecondsToLocaleString} from "../../domain/utils/timestamp-utils";
import React from "react";
import {Link} from "react-router-dom";
import FilterEditPanel from "../PvListPage/FilterEditPanel";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksTable from "../common/PvNamesWithLinksTable";

export default function SnapshotDetailsPanel({snapshotDetails}) {

        return (
            <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                    <h1>Snapshot Details</h1>
                    <b>ID: </b><p>{snapshotDetails.id}</p>
                    <b>Trigger Timestamp: </b><p>{snapshotDetails.timestamp}</p>
                    <b>First Sample Time: </b><p>{snapshotDetails.firstTime}</p>
                    <b>Last Sample Time: </b><p>{snapshotDetails.lastTime}</p>
                    <b>PV Names: </b>
                    <p/>
                    <PvNamesWithLinksTable objectWithPvs={snapshotDetails}/>
                    <p/>
                    <b>Attributes: </b>
                    <p/>
                    <AttributePairsTable objectWithAttributes={snapshotDetails}/>
                    <p/>
            </div>
        );

}
