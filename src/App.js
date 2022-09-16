import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ExploreSnapshotsPage from "./pages/ExploreSnapshotsPage";
import SnapshotPage from "./pages/SnapshotPage";
import NoPage from "./pages/NoPage";

import './App.css';

import React, { useEffect, useState } from "react";

const {QueryServiceClient} = require('./grpc-proto/query_grpc_web_pb.js');
console.log("connecting to datastore server");
const client = new QueryServiceClient("http://localhost:8080", null, null);

// const { Timestamp } = require('./grpc-proto/common_pb.js');
// const { Query, SnapshotQuery, SnapshotResponse, TimestampClause, Attribute, SnapshotTimestampClauseSelector, SnapshotTimestampClausePredicate } = require('./grpc-proto/query_pb.js');
// let pvQuery = new Query();
// pvQuery.setQuery("mpexPv01");
// client.listPVs(pvQuery, {}, (err, response) => {});

// execute grpc snapshot metadata query
// console.log("executing grpc snapshot metadata query");
// let nowSecondsSinceEpoch = Math.round(Date.now() / 1000);
// console.log("seconds: " + nowSecondsSinceEpoch);
// let nowTimestamp = new Timestamp();
// nowTimestamp.setEpochseconds(nowSecondsSinceEpoch);
// nowTimestamp.setNanoseconds(0);
// let endTimestamp = new Timestamp();
// endTimestamp.setEpochseconds(nowSecondsSinceEpoch);
// endTimestamp.setNanoseconds(0);
// let timestampClause = new TimestampClause();
// timestampClause.setSelector(SnapshotTimestampClauseSelector.SNAPSHOT_TIMESTAMP);
// timestampClause.setPredicate(SnapshotTimestampClausePredicate.BEFORE);
// timestampClause.setTimestamp(nowTimestamp);
// timestampClause.setEndtimestamp(endTimestamp);
// console.log("selector: " + timestampClause.getSelector());
// console.log("predicate: " + timestampClause.getPredicate());
// console.log("timestamp: " + timestampClause.getTimestamp());
// console.log("end timestamp: " + timestampClause.getEndtimestamp());
// //        let timestampClauseList = [ timestampClause ];
// let attributeClause = new Attribute();
// attributeClause.setName(".*");
// attributeClause.setValue(".*");
// //        let attributeClauseList = [ attributeClause ]
// let snapshotQuery = new SnapshotQuery();
// snapshotQuery.addTimestampclauses(timestampClause);
// snapshotQuery.addAttributeclauses(attributeClause);
// console.log(snapshotQuery.getTimestampclausesList());
// console.log(snapshotQuery.getAttributeclausesList());
// client.listSnapshots(snapshotQuery, {}, (err, response) => {
//     if (err) {
//         const errorMsg = response.getMsg();
//         console.log("error executing snapshot metadata query: " + errorMsg);
//     } else {
//         let resultList = response.getSnapshotsList();
//         console.log("snapshot metadata query success, result length: " + resultList.length);
//         console.log(resultList);
// //                 setSnapshots(resultList);
//     }
// });

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="explore" element={<ExploreSnapshotsPage client={client}/>} />
                    <Route path="snapshot" element={<SnapshotPage client={client}/>} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
