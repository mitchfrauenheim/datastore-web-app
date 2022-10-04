import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ListSnapshotsPage from "./pages/ListSnapshotsPage/ListSnapshotsPage";
import ViewSnapshotPage from "./pages/ViewSnapshotPage/ViewSnapshotPage";
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
                    <Route path="explore" element={<ListSnapshotsPage client={datastoreApi}/>} />
                    <Route path="snapshot" element={<ViewSnapshotPage client={datastoreApi}/>} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
