import './App.css';

//import QueryPage from "./pages/QueryPage";
import SnapshotPage from "./pages/SnapshotPage";

import React, { useEffect, useState } from "react";

const {QueryServiceClient} = require('./grpc-proto/query_grpc_web_pb.js');

console.log("connecting to datastore server");
const client = new QueryServiceClient("http://localhost:8080", null, null);

// // annotation query
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

export default function App() {

  // function renderQueryPage() {
  //     return <QueryPage client={client} />;
  // }

    const[selectedSnapshot, setSelectedSnapshot] = useState(null);

    function renderSnapshotPage() {
        return <SnapshotPage client={client} onOpen={onOpen}/>;
    }

    function renderSnapshotDataPage() {
        return (
            <div className="snapshotdatapage">
                <main className="main">
                    <p>{selectedSnapshot.timestamp}</p>
                </main>
            </div>
        );
    }

    function onOpen(snapshot) {
        console.log("onOpen");
        setSelectedSnapshot(snapshot); // this will start a new render because of useState hook
    }

    return (
        <div className="container">
            <main className="main">
                {selectedSnapshot ? renderSnapshotDataPage() : renderSnapshotPage()}
            </main>
        </div>
    );
}
