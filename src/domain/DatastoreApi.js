const {QueryServiceClient} = require("../grpc-proto/query_grpc_web_pb");
const {Timestamp, Attribute} = require("../grpc-proto/common_pb");
const {
    TimestampClause,
    SnapshotTimestampClauseSelector,
    SnapshotTimestampClausePredicate,
    SnapshotQuery,
    Query
} = require("../grpc-proto/query_pb");
const Snapshot = require("./Snapshot");
const SnapshotDataPage = require("./SnapshotDataPageModel");

class DatastoreApi {

    constructor() {
        this.client = null;
    }

    connect() {
        console.log("DatastoreApi.connect()");
        this.client = new QueryServiceClient("http://localhost:8080", null, null);
    }

    extractAndValidateTimeRange(filter) {

        let errorMsg = "";
        const firstTime = filter.timeRangeCriteria.firstTime;
        const lastTime = filter.timeRangeCriteria.lastTime;

        if (firstTime === null || firstTime === "" || lastTime === null || lastTime === "") {
            errorMsg = "error: first or last time not specified in filter time range criteria";
        }

        // handle first timestamp
        let firstTimeMillis = Date.parse(firstTime);
        if (isNaN(firstTimeMillis)) {
            errorMsg = "error: invalid ISO date format for first time: " + firstTime;
        }

        // handle last timestamp
        let lastTimeMillis = Date.parse(lastTime);
        if (isNaN(lastTimeMillis)) {
            errorMsg = "error: invalid ISO date format for last time: " + lastTime;
        }

        // check that firstTime <= lastTime
        if (firstTimeMillis > lastTimeMillis) {
            errorMsg = "error: first time: " + firstTime + " greater than last time: " + lastTime;
        }

        return [firstTime, lastTime, errorMsg, firstTimeMillis, lastTimeMillis];
    }

    queryListSnapshotsUsingFilter(filter, resultHandler, errorHandler) {

        // execute grpc snapshot metadata query
        console.log("DatastoreApi.queryListSnapshotsUsingFilter()");

        // filter must include time range, attribute, or pv criteria
        let valid = false;
        let snapshotQuery = new SnapshotQuery();
        let timestampClause = null;

        // process time range from filter
        if (filter.timeRangeCriteria !== null) {

            const timeRangeResult = this.extractAndValidateTimeRange(filter);
            if (timeRangeResult.length !== 5) {
                const errorMsg = "error: unexpected result length from extractAndValidateTimeRange()";
                console.log(errorMsg);
                return errorHandler(errorMsg);
            }
            const validationErrorMsg = timeRangeResult[2];
            if (validationErrorMsg !== "") {
                console.log(validationErrorMsg);
                return errorHandler(validationErrorMsg);
            }
            const firstTime = timeRangeResult[0];
            const lastTime = timeRangeResult[1];
            const firstTimeMillis = timeRangeResult[3];
            const lastTimeMillis = timeRangeResult[4];

            // handle first time
            let firstTimeSeconds = Math.round(firstTimeMillis / 1000);
            let firstTimestamp = new Timestamp();
            firstTimestamp.setEpochseconds(firstTimeSeconds);
            firstTimestamp.setNanoseconds(0);

            // handle last time
            let lastTimeSeconds = Math.round(lastTimeMillis / 1000);
            let lastTimestamp = new Timestamp();
            lastTimestamp.setEpochseconds(lastTimeSeconds);
            lastTimestamp.setNanoseconds(0);

            // build TimestampClause
            timestampClause = new TimestampClause();
            timestampClause.setSelector(SnapshotTimestampClauseSelector.SNAPSHOT_TIMESTAMP);
            timestampClause.setPredicate(SnapshotTimestampClausePredicate.BETWEEN);
            timestampClause.setTimestamp(firstTimestamp);
            timestampClause.setEndtimestamp(lastTimestamp);
            snapshotQuery.addTimestampclauses(timestampClause);
            valid = true;
        }

        // process attribute filter
        if (filter.attributeCriteriaList.length > 0) {
            for (let attributeCriteria of filter.attributeCriteriaList) {
                const attributeName = attributeCriteria.name;
                const attributeValue = attributeCriteria.value;

                if (attributeName === null || attributeName === "") {
                    const errorMsg = "error: no attribute name specified in attribute filter criteria";
                    console.log(errorMsg);
                    return errorHandler(errorMsg);
                }

                if (attributeValue === null || attributeValue === "") {
                    const errorMsg = "error: no attribute value specified in attribute filter criteria";
                    console.log(errorMsg);
                    return errorHandler(errorMsg);
                }

                const queryAttribute = new Attribute();
                queryAttribute.setName(attributeName);
                queryAttribute.setValue(attributeValue);
                snapshotQuery.addAttributeclauses(queryAttribute);
                valid = true;
            }
        }

        // check if query is valid, e.g., at least one filter applied
        if (!valid) {
            const errorMsg = "error: no filter criteria specified";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        // execute query
        this.client.listSnapshots(snapshotQuery, {}, (err, response) => {

            if (err) {
                const errorMsg = "error executing snapshot metadata query: " + err;
                console.log(errorMsg);
                return errorHandler(errorMsg);

            } else {
                let resultList = response?.getSnapshotsList() || [];
                console.log("snapshot metadata query success, result length: " + resultList.length);
                resultList = resultList
                    .map((snapshot) => {
                        return new Snapshot(snapshot);
                    });
                return resultHandler(resultList);
            }
        });
    }

    queryListSnapshotDataUsingFilter(filter, resultHandler, errorHandler) {

        // execute grpc query to retrieve snapshot data
        console.log("DatastoreApi.queryListSnapshotDataUsingFilter()");

//        let firstTimeString = new Date(firstSeconds*1000).toISOString();
//        let lastTimeString = new Date(lastSeconds*1000).toISOString();
//        let firstTimeString = "2022-09-21T03:03:19.504Z";
//        let lastTimeString = "2022-09-21T03:03:19.514Z";

        let timeRangeWhereClause = "";
        if (filter.timeRangeCriteria !== null) {
            const timeRangeResult = this.extractAndValidateTimeRange(filter);
            if (timeRangeResult.length !== 5) {
                const errorMsg = "error: unexpected result length from extractAndValidateTimeRange()";
                console.log(errorMsg);
                return errorHandler(errorMsg);
            }
            const validationErrorMsg = timeRangeResult[2];
            if (validationErrorMsg !== "") {
                console.log(validationErrorMsg);
                return errorHandler(validationErrorMsg);
            }
            const firstTimeString = timeRangeResult[0];
            const lastTimeString = timeRangeResult[1];
            timeRangeWhereClause = "time >= '" + firstTimeString + "' AND time <= '" + lastTimeString + "'";
        } else {
            const errorMsg = "error: time range filter must be specified for snapshot data query to limit result size";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        if (timeRangeWhereClause === "") {
            const errorMsg = "error: missing time range where clause building query";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        let selectClause = "`*.*`";
        if (filter.pvCriteria !== null) {
            // const selectClause = "`mpexPv01`";
            selectClause = "'" + filter.pvCriteria.pattern + "'";
        }

        const queryString = "SELECT " + selectClause + " WHERE " + timeRangeWhereClause;
        console.log(queryString);

        let snapshotQuery = new Query();
        snapshotQuery.setQuery(queryString);
        this.client.listSnapshotData(snapshotQuery, {}, (err, response) => {
            if (err) {
                const errorMsg = "error executing snapshot data query: " + err;
                console.log(errorMsg);
                return errorHandler(errorMsg);

            } else {
                console.log("snapshot data query success");
                return resultHandler(new SnapshotDataPage(response));
            }
        });
    }

}

module.exports = DatastoreApi




// // ========================= test pv query
// let pvQuery = new Query();
// pvQuery.setQuery("mpexPv01");
// client.listPVs(pvQuery, {}, (err, response) => {});





// ========================== original code from QueryPage/index.js
// ========================== for calling grpc API for retrieving PVs

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
