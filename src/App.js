import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SnapshotListPage from "./pages/SnapshotListPage/SnapshotListPage";
import SnapshotPage from "./pages/SnapshotPage/SnapshotPage";
import NoPage from "./pages/NoPage";

import './App.css';

import React, { useEffect, useState } from "react";
import DatastoreApi from "./domain/grpc-client/DatastoreApi";

const datastoreApi = new DatastoreApi();
datastoreApi.connect();

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="snapshotList" element={<SnapshotListPage client={datastoreApi}/>} />
                    <Route path="snapshot" element={<SnapshotPage client={datastoreApi}/>} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
