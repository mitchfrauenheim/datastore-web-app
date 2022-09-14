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

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="explore" element={<ExploreSnapshotsPage />} />
                    <Route path="snapshot" element={<SnapshotPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
