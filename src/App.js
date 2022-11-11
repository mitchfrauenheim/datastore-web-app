import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SnapshotListPage from "./pages/SnapshotListPage/SnapshotListPage";
import SnapshotPage from "./pages/SnapshotPage/SnapshotPage";
import NoPage from "./pages/NoPage";

import './App.css';

import React, { useEffect, useState } from "react";
import DatastoreApi from "./domain/grpc-client/DatastoreApi";
import PvListPage from "./pages/PvListPage/PvListPage";
import PvPage from "./pages/PvPage/PvPage";
import AnnotationListPage from "./pages/AnnotationListPage/AnnotationListPage";
import AnnotationPage from "./pages/AnnotationPage/AnnotationPage";

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
                    <Route path="pvList" element={<PvListPage client={datastoreApi}/>} />
                    <Route path="pv" element={<PvPage client={datastoreApi}/>} />
                    <Route path="annotationList" element={<AnnotationListPage client={datastoreApi}/>} />
                    <Route path="annotation" element={<AnnotationPage client={datastoreApi}/>} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
