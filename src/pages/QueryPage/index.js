import "./QueryPage.css";
import React, { useEffect, useState } from "react";
import {Query} from "../../grpc-proto/query_pb";

export default function QueryPage({ client }) {

    let[pvList, setPvList] = useState(null);
    let[pvCount, setPvCount] = useState(0);
//    let[pvQuerySubmitted, setPvQuerySubmitted] = useState(false);

    let pvQuerySubmitted = false;

    useEffect(() => {
        if (pvCount === 0) getAllPvs();
    });

    function getAllPvs() {
        if (pvQuerySubmitted) return;
        pvQuerySubmitted = true;
        console.log("executing PV query");
        let pvQuery = "mpexPv09";
        let pvRequest = new Query(pvQuery);
        client.listPVs(pvRequest, {}, (err, response) => {
            if (err) {
                const errorMsg = response.getMsg();
                console.log("error executing PV query: " + errorMsg);
            } else {
                console.log("PV query success");
                let resultList = response.getPvsList();
                console.log(resultList);
                setPvList(resultList);
                setPvCount(resultList.length);
                console.log("query pv count: " + resultList.length);
            }
        });
    }

    return (
        <div>
            <p>pv count: {pvCount}</p>
        </div>
    )

}