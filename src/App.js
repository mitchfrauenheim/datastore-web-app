import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SnapshotListPage from "./pages/SnapshotListPage/SnapshotListPage";
import SnapshotPage from "./pages/SnapshotPage/SnapshotPage";
import NoPage from "./pages/NoPage";

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline'
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"

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
            let configHostname = "";
            if (!clientConfig) {
                console.log("no client config api result");
            } else {
                const {hostname} = clientConfig;
                if (!hostname) {
                    console.log("no hostname specified in client config")
                } else {
                    configHostname = hostname;
                }
            }
            // default to localhost if nothing specified in config
            if ( !configHostname || configHostname === "") {
                configHostname = Constants.DEFAULTHOSTNAME;
                console.log("using default hostname: " + configHostname);
            }
            const apiObj = new DatastoreApi(configHostname);
            setDatastoreConfig(configHostname);
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
            {/* Helmet operates like a <head> element in traditional HTML. This meta tag is necessary for MUI's responsiveness on different size devices */}
            <Helmet>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Helmet>
            {/* CSS Baseline corrects inconsistencies across browsers so MUI components appear the same universally */}
            <CssBaseline />
            {(datastoreApi !== null) ? renderRouter() : renderConnectingPanel()}
        </div>
    );

}
