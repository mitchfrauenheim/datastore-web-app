const {QueryServiceClient} = require("../grpc-proto/query_grpc_web_pb");
const {Timestamp} = require("../grpc-proto/common_pb");
const {
    TimestampClause,
    SnapshotTimestampClauseSelector,
    SnapshotTimestampClausePredicate,
    SnapshotQuery
} = require("../grpc-proto/query_pb");
const Snapshot = require("./Snapshot");

class DatastoreApi {

    constructor() {
        this.client = null;
    }

    connect() {
        console.log("DatastoreApi.connect()");
        this.client = new QueryServiceClient("http://localhost:8080", null, null);
    }

    querySnapshotMetadataUsingFilter(filter, resultHandler, errorHandler) {

        // execute grpc snapshot metadata query
        console.log("DatastoreApi.querySnapshotMetadataUsingFilter()");

        // extract time range from filter
        if (filter.timeRangeCriteria === null) {
            const errorMsg = "error: no time range criteria provided in filter";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        let firstTime = filter.timeRangeCriteria.firstTime;
        let lastTime = filter.timeRangeCriteria.lastTime;
        if (firstTime === null || lastTime === null) {
            const errorMsg = "error: first or last time not specified in filter time range criteria";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        // handle first timestamp
        let firstTimeMillis = Date.parse(firstTime);
        console.log(firstTimeMillis);
        if (isNaN(firstTimeMillis)) {
            const errorMsg = "error: invalid ISO date format for first time: " + firstTime;
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }
        let firstTimeSeconds = Math.round(firstTimeMillis / 1000);
        let firstTimestamp = new Timestamp();
        firstTimestamp.setEpochseconds(firstTimeSeconds);
        firstTimestamp.setNanoseconds(0);

        // handle last timestamp
        let lastTimeMillis = Date.parse(lastTime);
        if (isNaN(lastTimeMillis)) {
            const errorMsg = "error: invalid ISO date format for last time: " + lastTime;
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }
        let lastTimeSeconds = Math.round(lastTimeMillis / 1000);
        let lastTimestamp = new Timestamp();
        lastTimestamp.setEpochseconds(lastTimeSeconds);
        lastTimestamp.setNanoseconds(0);

        // build TimestampClause
        let timestampClause = new TimestampClause();
        timestampClause.setSelector(SnapshotTimestampClauseSelector.SNAPSHOT_TIMESTAMP);
        timestampClause.setPredicate(SnapshotTimestampClausePredicate.BETWEEN);
        timestampClause.setTimestamp(firstTimestamp);
        timestampClause.setEndtimestamp(lastTimestamp);

        // build snapshot query
        let snapshotQuery = new SnapshotQuery();
        snapshotQuery.addTimestampclauses(timestampClause);

        // execute query
        const result = this.client.listSnapshots(snapshotQuery, {}, (err, response) => {

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
