import {epochSecondsToLocaleString} from "../../domain/utils/timestamp-utils";
import React from "react";
import {Link} from "react-router-dom";
import FilterEditPanel from "../PvListPage/FilterEditPanel";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksTable from "../common/PvNamesWithLinksTable";
import SnapshotDataTable from "./SnapshotDataTable";

export default function SnapshotDetailsPanel({snapshotDetails, errorMsg}) {

    function renderDetailsPanel() {
        return (
            <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                <h1>Snapshot Details</h1>
                <b>ID: </b><p>{snapshotDetails.id}</p>
                <b>Trigger Timestamp: </b><p>{snapshotDetails.snapshotTimestampLocaleString}</p>
                <b>First Sample Time: </b><p>{snapshotDetails.firstTimestampLocaleString}</p>
                <b>Last Sample Time: </b><p>{snapshotDetails.lastTimestampLocaleString}</p>
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

    function renderNoSnapshotPanel() {
        return (
            <div>
                <h1>loading snapshot details</h1>
            </div>
        );
    }
    function renderQueryErrorPanel() {
        return (
            <div>
                <h1>{errorMsg}</h1>
            </div>
        );
    }

    return (
        <div style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
            {(errorMsg !== null) ? renderQueryErrorPanel() :
                (snapshotDetails === null) ? renderNoSnapshotPanel() : renderDetailsPanel()}
        </div>
    );
}
