import React, {useEffect, useState} from "react";
import SnapshotsTable from "../components/SnapshotsTable";

class Snapshot {

    constructor(id, timestamp, description) {
        this.id = id;
        this.timestamp = timestamp;
        this.description = description;
    }

}

export default function ExploreSnapshotsPage({ client, onOpen }) {

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
                <SnapshotsTable snapshots={snapshots} onOpen={onOpen}/>
            </div>
        </div>
    );
}



// =============================== original code  from app.js

// const[selectedSnapshot, setSelectedSnapshot] = useState(null);
//
// function renderSnapshotPage() {
//     return <SnapshotPage client={client} onOpen={onOpen}/>;
// }
//
// function renderSnapshotDataPage() {
//     return (
//         <div className="snapshotdatapage">
//             <main className="main">
//                 <p>{selectedSnapshot.timestamp}</p>
//             </main>
//         </div>
//     );
// }
//
// function onOpen(snapshot) {
//     console.log("onOpen");
//     setSelectedSnapshot(snapshot); // this will start a new render because of useState hook
// }
//
// return (
//
//     <div className="container">
//         <main className="main">
//             {selectedSnapshot ? renderSnapshotDataPage() : renderSnapshotPage()}
//         </main>
//     </div>
//
// );



// ========================== original code from QueryPage/index.js
// for calling grpc API for retrieving PVs

// import "./QueryPage.css";
// import React, { useEffect, useState } from "react";
// import {Query} from "../../grpc-proto/query_pb";
//
// export default function QueryPage({ client }) {
//
//     let[pvList, setPvList] = useState(null);
//     let[pvCount, setPvCount] = useState(0);
// //    let[pvQuerySubmitted, setPvQuerySubmitted] = useState(false);
//
//     let pvQuerySubmitted = false;
//
//     useEffect(() => {
//         if (pvCount === 0) getAllPvs();
//     });
//
//     function getAllPvs() {
//         if (pvQuerySubmitted) return;
//         pvQuerySubmitted = true;
//         console.log("executing PV query");
//         let pvQuery = "mpexPv09";
//         let pvRequest = new Query(pvQuery);
//         client.listPVs(pvRequest, {}, (err, response) => {
//             if (err) {
//                 const errorMsg = response.getMsg();
//                 console.log("error executing PV query: " + errorMsg);
//             } else {
//                 console.log("PV query success");
//                 let resultList = response.getPvsList();
//                 console.log(resultList);
//                 setPvList(resultList);
//                 setPvCount(resultList.length);
//                 console.log("query pv count: " + resultList.length);
//             }
//         });
//     }
//
//     return (
//         <div>
//             <p>pv count: {pvCount}</p>
//         </div>
//     )
//
// }




// ===================================== grpc annotation query

// let annotationQuery = ".*";
// let annotationRequest = new Query(annotationQuery);
// client.listAnnotations(annotationRequest, {}, (err, response) => {
//   if (err) {
//     console.error("error encountered in annotation query: " + err);
//     return;
//   }
//   console.log("annotation result: ");
//   console.log(response.getAnnotationsList());
// });
