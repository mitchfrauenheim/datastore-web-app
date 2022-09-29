import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SnapshotDetailsPanel from "./SnapshotDetailsPanel";
import FilterPanel from "./FilterPanel";
import SnapshotDataPanel from "./SnapshotDataPanel";
import SnapshotDataPage from "../../domain/SnapshotDataPage";

export default function ViewSnapshotPage({ client, onOpen }) {

    let [snapshotDataPage, setSnapshotDataPage] = useState(null);

    let snapshotQuerySubmitted = false;

    let [searchParams, setSearchParams] = useSearchParams();

    let snapshotId = searchParams.get("id");
    let firstSeconds = searchParams.get("first");
    let lastSeconds = searchParams.get("last");

    useEffect(() => {
        getSnapshot();
    }, []);

    function getSnapshot() {
        console.log("getSnapshot()");

        if (snapshotQuerySubmitted) return;
        snapshotQuerySubmitted = true;

        // execute query to retrieve snapshot data

        console.log("executing grpc snapshot data query");
//        let firstTimeString = new Date(firstSeconds*1000).toISOString();
//        let lastTimeString = new Date(lastSeconds*1000).toISOString();
        let firstTimeString = "2022-09-21T03:03:19.504Z";
        let lastTimeString = "2022-09-21T03:03:19.514Z";
        let queryString = "SELECT `*.*` WHERE time >= '" + firstTimeString + "' AND time <= '" + lastTimeString + "'";
        console.log(queryString);

        const {
            Query
        } = require('../../grpc-proto/query_pb.js');

        let snapshotQuery = new Query();
        snapshotQuery.setQuery(queryString);
        client.listSnapshotData(snapshotQuery, {}, (err, response) => {
            if (err) {
                const errorMsg = response.getMsg();
                console.log("error executing snapshot data query: " + errorMsg);
            } else {
                console.log("snapshot data query success");
                setSnapshotDataPage(new SnapshotDataPage(response));
            }
        });
    }

    function renderSnapshotPage() {
        return (
            <div>
                <SnapshotDetailsPanel snapshotId={snapshotId} firstSeconds={firstSeconds} lastSeconds={lastSeconds} />
                <FilterPanel/>
                <SnapshotDataPanel snapshotDataPage={snapshotDataPage}/>
            </div>
        );
    }

    function renderNoSnapshotPage() {
        return <h1>No Snapshot id Specified</h1>;
    }

    return (
        <div>
            {snapshotId ? renderSnapshotPage() : renderNoSnapshotPage()}
        </div>
    );
}
