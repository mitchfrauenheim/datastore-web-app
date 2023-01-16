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

import Constants from "./domain/Constants";

import { getClientConfig } from "./domain/node-api/config";

export default function App() {

    /*
    The isConnecting flag is used to prevent us from trying to retrieve the GRPC
    configuration and initialize the DatastoreApi multiple times.  The isConnected
    state variable is used to make sure that we don't try to create the BrowserRouter
    component until after we have retrieved the configuration asynchronously and
    initialized the DatastoreApi.  The datastoreConfig state variable is used to pass
    the GRPC configuration hostname to components for displaying it within the
    application header and home page.
     */

    let [datastoreConfig, setDatastoreConfig] = useState("");
    let [datastoreApi, setDatastoreApi] = useState(null);
    let isConnecting = false;

    useEffect(() => {

        const connectDatastoreClient = async () => {
            console.log("App.useEffect.connectDatastoreClient()");
            // get GRPC configuration from server api
            const clientConfig = await getClientConfig();
            let hostname = "";
            if (!clientConfig) {
                console.log("no client config api result");
            } else {
                const {configHostname} = clientConfig;
                if (!configHostname) {
                    console.log("no hostname specified in client config")
                } else {
                    hostname = configHostname;
                }
            }
            // default to localhost if nothing specified in config
            if ( !hostname || hostname === "") {
                hostname = Constants.DEFAULTHOSTNAME;
                console.log("using default hostname: " + hostname);
            }
            const apiObj = new DatastoreApi(hostname);
            setDatastoreConfig(hostname);
            setDatastoreApi(apiObj);
        }

        console.log("App.useEffect()");
        if (isConnecting) return;
        isConnecting = true;
        connectDatastoreClient().catch(console.error);
    }, []);

    function renderRouter() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout datastoreConfig={datastoreConfig}/>}>
                        <Route index element={<HomePage datastoreConfig={datastoreConfig}/>} />
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

    function renderConnectingPanel() {
        return (
            <div>
                <p>Initializing Datastore client...</p>;
            </div>
        );
    }

    return (
        <div>
            {(datastoreApi !== null) ? renderRouter() : renderConnectingPanel()}
        </div>
    );

}
