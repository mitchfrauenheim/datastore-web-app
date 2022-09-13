import SnapshotsList from "./../../components/SnapshotsList";
import "./SnapshotPage.css";
import React, { useEffect, useState } from "react";

class Snapshot {

    constructor(id, timestamp, description) {
        this.id = id;
        this.timestamp = timestamp;
        this.description = description;
    }

}

export default function SnapshotPage({ client, onOpen }) {

    let[snapshots, setSnapshots] = useState([]);

    let snapshotQuerySubmitted = false;

    useEffect(() => {
        getSnapshots();
    }, []);

    function getSnapshots() {

        console.log("getSnapshots()");

        if (snapshotQuerySubmitted) return;
        snapshotQuerySubmitted = true;

        // change this code to call grpc snapshot query when ready
        // console.log("executing PV query");
        // let pvQuery = "mpexPv09";
        // let pvRequest = new Query(pvQuery);
        // client.listPVs(pvRequest, {}, (err, response) => {
        //     if (err) {
        //         const errorMsg = response.getMsg();
        //         console.log("error executing PV query: " + errorMsg);
        //     } else {
        //         console.log("PV query success");
        //         let resultList = response.getPvsList();
        //         console.log(resultList);
        //         setPvList(resultList);
        //         setPvCount(resultList.length);
        //         console.log("query pv count: " + resultList.length);
        //     }
        // });

        console.log("generating hardwired snapshot data");
        let hardwiredSnapshots = [];
        hardwiredSnapshots.push(new Snapshot(1, "2022-09-09T13:45:00", "power outage"));
        hardwiredSnapshots.push(new Snapshot(2, "2022-09-09T13:50:00", "small fire"));
        hardwiredSnapshots.push(new Snapshot(3, "2022-09-09T13:55:00", "clean up on aisle 9"));
        setSnapshots(hardwiredSnapshots);

    }

    return (
        <div>
            <div>
                <div
                    style={{ paddingBottom: "4px", borderBottom: "1px solid darkgray" }}
                >
                    <div>
                        <button onClick={getSnapshots}>REFRESH</button>
                    </div>
                </div>
                <SnapshotsList snapshots={snapshots} onOpen={onOpen}/>
            </div>
        </div>
    );

}