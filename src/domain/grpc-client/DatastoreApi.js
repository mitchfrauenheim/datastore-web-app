const {QueryServiceClient} = require("./grpc-proto/query_grpc_web_pb");
const {Timestamp, Attribute} = require("./grpc-proto/common_pb");
const {
    TimestampClause,
    SnapshotTimestampClauseSelector,
    SnapshotTimestampClausePredicate,
    SnapshotQuery,
    Query,
    IdQuery
} = require("./grpc-proto/query_pb");
const Snapshot = require("../models/Snapshot");
const SnapshotDataPageModel = require("../models/SnapshotDataPageModel");
const Pv = require("../models/Pv");
const Constants = require("../Constants");
const SnapshotDataPageQueryParams = require("../models/SnapshotDataPageQueryParams");

class DatastoreApi {

    constructor() {
        this.client = null;
    }

    connect() {
        console.log("DatastoreApi.connect()");
        this.client = new QueryServiceClient("http://localhost:8080", null, null);
    }

    handleApiError(error, errorHandler) {

        console.log("DatastoreApi.handleApiError()");
        console.log("api error follows...");
        console.log(error);

        let userErrorMsg = "";
        const apiErrorMsg = error.message;

        const serviceNotRunningMsg = "Http response at 400 or 500 level";
        if (apiErrorMsg === serviceNotRunningMsg) {
            userErrorMsg =
                "Error connecting to envoy proxy or datastore query services (" +
                serviceNotRunningMsg +
                ")";
        } else {
            userErrorMsg =
                "Unexpected exception invoking datastore query API (" + apiErrorMsg + ")";
        }

        errorHandler(userErrorMsg);
    }

    extractAndValidateTimeRange(filter) {

        console.log("DatastoreApi.extractAndValidateTimeRange()");
        let errorMsg = "";
        const firstTime = filter.timeRangeCriteria.firstTime;
        const lastTime = filter.timeRangeCriteria.lastTime;

        if (firstTime === null || firstTime === "" || lastTime === null || lastTime === "") {
            errorMsg =
                "error: first or last time not specified in filter time range criteria";
        }

        // handle first timestamp
        let firstTimeMillis = Date.parse(firstTime);
        if (isNaN(firstTimeMillis)) {
            errorMsg = "error: invalid ISO date format for first time: " + firstTime;
        }

        // check for min first time
        if (filter.minFirstTime !== null) {
            const minFirstTimeMills = Date.parse(filter.minFirstTime);
            if (firstTimeMillis < minFirstTimeMills) {
                errorMsg = "error: first time before min first time: " + filter.minFirstTime;
            }
        }

        // handle last timestamp
        let lastTimeMillis = Date.parse(lastTime);
        if (isNaN(lastTimeMillis)) {
            errorMsg = "error: invalid ISO date format for last time: " + lastTime;
        }

        // check for max last time
        if (filter.maxLastTime !== null) {
            const maxLastTimeMills = Date.parse(filter.maxLastTime);
            if (lastTimeMillis > maxLastTimeMills) {
                errorMsg = "error: last time after max last time: " + filter.maxLastTime;
            }
        }

        // check that firstTime <= lastTime
        if (firstTimeMillis > lastTimeMillis) {
            errorMsg =
                "error: first time: " + firstTime + " greater than last time: " + lastTime;
        }

        return [firstTime, lastTime, errorMsg, firstTimeMillis, lastTimeMillis];
    }

    queryGetSnapshotById(snapshotId, resultHandler, noResultHandler, errorHandler) {

        // Calls GRPC api function getSnapshotById().
        // Calls resultHandler() with snapshot having specified id on success,
        // noResultHandler() if no such object is found,
        // or errorHandler() if there is an api error.

        console.log("DatastoreApi.queryGetSnapshotById()");

        if (snapshotId === null) {
            const errorMsg = "error: snapshotId must be specified";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        const snapshotIdNum = Number(snapshotId);
        if (isNaN(snapshotIdNum)) {
            const errorMsg ="error: invalid snapshot id: " + snapshotId;
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        // build and execute query
        let query = new IdQuery();
        query.setId(snapshotIdNum);
        this.client.getSnapshotById(query, {}, (err, response) => {

            if (err) {
                return this.handleApiError(err, errorHandler);

            } else {
                if (response === null) {
                    const errorMsg = "no snapshot found for specified id: " + snapshotId;
                    console.log(errorMsg);
                    return noResultHandler(errorMsg);
                }
                const snapshot = new Snapshot(response);
                console.log("Snapshot metadata query success");
                return resultHandler(snapshot);
            }
        });
    }

    queryListSnapshotsUsingFilter(filter, resultHandler, noResultHandler, errorHandler) {

        // execute grpc snapshot metadata query
        console.log("DatastoreApi.queryListSnapshotsUsingFilter()");

        // filter must include time range, attribute, or pv criteria
        let valid = false;
        let snapshotQuery = new SnapshotQuery();
        let timestampClause = null;

        // process time range filter criteria
        if (filter.timeRangeCriteria !== null) {

            const timeRangeResult = this.extractAndValidateTimeRange(filter);
            if (timeRangeResult.length !== 5) {
                const errorMsg =
                    "error: unexpected result length from extractAndValidateTimeRange()";
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
            console.log(
                "adding time range clause first: " + firstTime + " last: " + lastTime);
            valid = true;
        }

        // process attribute filter criteria
        if (filter.attributeCriteriaList.length > 0) {
            for (let attributeCriteria of filter.attributeCriteriaList) {
                const attributeName = attributeCriteria.name;
                const attributeValue = attributeCriteria.value;

                if (attributeName === null || attributeName === "") {
                    const errorMsg =
                        "error: no attribute name specified in attribute filter criteria";
                    console.log(errorMsg);
                    return errorHandler(errorMsg);
                }

                if (attributeValue === null || attributeValue === "") {
                    const errorMsg =
                        "error: no attribute value specified in attribute filter criteria";
                    console.log(errorMsg);
                    return errorHandler(errorMsg);
                }

                const queryAttribute = new Attribute();
                queryAttribute.setName(attributeName);
                queryAttribute.setValue(attributeValue);
                snapshotQuery.addAttributeclauses(queryAttribute);
                console.log(
                    "adding attribute clause name: " +
                    attributeName +
                    " value: " +
                    attributeValue);
                valid = true;
            }
        }

        // process PV filter criteria
        if (filter.pvCriteriaList.length  > 0) {
            for (let pvCriteria of filter.pvCriteriaList) {
                const pvPattern = pvCriteria.pattern;
                if (pvPattern === null || pvPattern === "") {
                    const errorMsg = "error: no pattern specified in PV filter criteria";
                    console.log(errorMsg);
                    return errorHandler(errorMsg);
                }
                snapshotQuery.addPvnameclause(pvPattern);
                console.log("adding pv clause with pattern: " + pvPattern);
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
                return this.handleApiError(err, errorHandler);

            } else {
                let resultList = response?.getSnapshotsList() || [];
                console.log(
                    "snapshot metadata query success, result length: " +
                    resultList.length);
                if (resultList.length === 0) {
                    const errorMsg = "query result is empty";
                    console.log(errorMsg);
                    return noResultHandler(errorMsg);
                }
                resultList = resultList
                    .map((snapshot) => {
                        return new Snapshot(snapshot);
                    });
                return resultHandler(resultList);
            }
        });
    }

    calculateLastTime(firstTimeMillis, pageQueryParams) {

        let lastTimeMillis = firstTimeMillis + pageQueryParams.pageRangeMillis;

        // Check max time limit.
        if (lastTimeMillis > pageQueryParams.maxLastTime) {
            // Add one milli to maximum since the query range is not inclusive of the end value.
            lastTimeMillis = pageQueryParams.maxLastTime + 1;
        }
        return lastTimeMillis;
    }

    getFirstSnapshotDataPage(
        filter, snapshot, resultHandler, noResultHandler, errorHandler) {

        // Retrieves the first page of snapshot data.

        console.log("DatastoreApi.getFirstSnapshotDataPage()");

        // Determine min/max limits for snapshot data query time range based on snapshot and filter.
        let minFirstTime = snapshot.firstTimestampAsMillis;
        let maxLastTime = snapshot.lastTimestampAsMillis;

        // Validate time range criteria in filter if present.
        if (filter.timeRangeCriteria !== null) {
            // validate timeRangeCriteria
            const timeRangeResult = this.extractAndValidateTimeRange(filter);
            if (timeRangeResult.length !== 5) {
                const errorMsg =
                    "error: unexpected result length from extractAndValidateTimeRange()";
                console.log(errorMsg);
                return errorHandler(errorMsg);
            }
            const validationErrorMsg = timeRangeResult[2];
            if (validationErrorMsg !== "") {
                console.log(validationErrorMsg);
                return errorHandler(validationErrorMsg);
            }
            // use filter time range as bounds on paging snapshot data query
            minFirstTime = timeRangeResult[3];
            maxLastTime = timeRangeResult[4];
        }

        let selectClause = "";
        if (filter.pvCriteriaList.length > 0) {
            let first = true;
            for (let pvCriteria of filter.pvCriteriaList) {
                const pvPattern = pvCriteria.pattern;
                if (pvPattern === null || pvPattern === "") {
                    const errorMsg = "error: no pattern specified in PV filter criteria";
                    console.log(errorMsg);
                    return errorHandler(errorMsg);
                }
                if (!first) {
                    selectClause = selectClause + ", ";
                } else {
                    first = false;
                }
                selectClause = selectClause + "'" + pvPattern + "'";
            }
        } else {
            // selectClause = "`*.*`";
            // List the PVs from the snapshot object explicitly in the SELECT clause,
            // as a workaround to being able to specify a snapshotId in the query.
            // At least we can limit the query to the PVs in the snapshot.
            selectClause = "";
            let first = true;
            for (let pvNameString of filter.availablePvsList) {
                if (!first) {
                    selectClause = selectClause + ", ";
                } else {
                    first = false;
                }
                selectClause = selectClause + "'" + pvNameString + "'";
            }
        }

        // Determine number of milliseconds per page for use in generating page queries.
        const millisPerTimestamp = snapshot.millisPerTimestamp;
        const timestampsPerPage = Constants.SNAPSHOTDATAPAGESIZE;
        const pageRangeMillis = Math.round(timestampsPerPage * millisPerTimestamp);

        const pageQueryParams = new SnapshotDataPageQueryParams(
            minFirstTime,
            maxLastTime,
            selectClause,
            filter.availablePvsList,
            timestampsPerPage,
            millisPerTimestamp,
            pageRangeMillis);

        // Determine time range for first page query.
        const firstTimeMillis = minFirstTime
        const lastTimeMillis = this.calculateLastTime(firstTimeMillis, pageQueryParams);

        this.queryListSnapshotData(
            firstTimeMillis,
            lastTimeMillis,
            pageQueryParams,
            resultHandler,
            noResultHandler,
            errorHandler);

    }

    getNextSnapshotDataPage(snapshotDataPageModel, resultHandler, noResultHandler, errorHandler) {

        // Retrieves the next page of snapshot data, using time range and limits from previous page to calculate
        // new time range.

        console.log("DatastoreApi.getNextSnapshotDataPage()");

        const pageQueryParams = snapshotDataPageModel.pageQueryParams;
        console.log(snapshotDataPageModel);
        console.log(pageQueryParams);

        if (snapshotDataPageModel.lastTimeMillis >= pageQueryParams.maxLastTime) {
            // Already at max time limit, nothing to do.
            console.log("last data page already displayed");
            return;
        }

        const newFirstTimeMillis = snapshotDataPageModel.lastTimeMillis;
        const newLastTimeMillis = this.calculateLastTime(newFirstTimeMillis, pageQueryParams);

        this.queryListSnapshotData(
            newFirstTimeMillis,
            newLastTimeMillis,
            pageQueryParams,
            resultHandler,
            noResultHandler,
            errorHandler);
    }

    calculateFirstTime(lastTimeMillis, pageQueryParams) {

        let firstTimeMillis = lastTimeMillis - pageQueryParams.pageRangeMillis;

        // Check max time limit.
        if (firstTimeMillis < pageQueryParams.minFirstTime) {
            firstTimeMillis = pageQueryParams.minFirstTime;
        }
        return firstTimeMillis;
    }

    getPreviousSnapshotDataPage(snapshotDataPageModel, resultHandler, noResultHandler, errorHandler) {

        // Retrieves the previous page of snapshot data, using time range and limits from previous page to calculate
        // new time range.

        console.log("DatastoreApi.getPreviousSnapshotDataPage()");

        const pageQueryParams = snapshotDataPageModel.pageQueryParams;

        if (snapshotDataPageModel.firstTimeMillis <= pageQueryParams.minFirstTime) {
            // Already at max time limit, nothing to do.
            console.log("first data page already displayed");
            return;
        }

        const newLastTimeMillis = snapshotDataPageModel.firstTimeMillis ;
        const newFirstTimeMillis = this.calculateFirstTime(newLastTimeMillis, pageQueryParams);

        this.queryListSnapshotData(
            newFirstTimeMillis,
            newLastTimeMillis,
            pageQueryParams,
            resultHandler,
            noResultHandler,
            errorHandler);
    }

    queryListSnapshotData(
        firstTimeMillis, lastTimeMillis, pageQueryParams, resultHandler, noResultHandler, errorHandler) {

        // execute grpc query to retrieve snapshot data
        console.log("DatastoreApi.queryListSnapshotDataUsingFilter()");

        const firstTimeString = new Date(firstTimeMillis).toISOString();
        const lastTimeString = new Date(lastTimeMillis).toISOString();
        const timeRangeWhereClause =
            "time >= '" + firstTimeString + "' AND time < '" + lastTimeString + "'";
        
        if (timeRangeWhereClause === "") {
            const errorMsg = "error: missing time range where clause building query";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        const queryString = "SELECT " + pageQueryParams.selectClause
            + " WHERE " + timeRangeWhereClause;
        console.log(queryString);

        let snapshotQuery = new Query();
        snapshotQuery.setQuery(queryString);
        this.client.listSnapshotData(snapshotQuery, {}, (err, response) => {
            if (err) {
                return this.handleApiError(err, errorHandler);

            } else {
                console.log("snapshot data query success");
                console.log(response);
                if (response.getTotalrows() === 0) {
                    const errorMsg = "query result is empty";
                    console.log(errorMsg);
                    return noResultHandler(errorMsg);
                }
                return resultHandler(new SnapshotDataPageModel(
                    response, pageQueryParams.availablePvsList, firstTimeMillis, lastTimeMillis, pageQueryParams));
            }
        });
    }

    queryListPvsUsingFilter(filter, resultHandler, noResultHandler, errorHandler) {

        // execute grpc pv metadata query
        console.log("DatastoreApi.queryListPvsUsingFilter()");

        // filter must attribute or pv criteria
        let valid = false;

        // // process attribute filter
        // if (filter.attributeCriteriaList.length > 0) {
        //     for (let attributeCriteria of filter.attributeCriteriaList) {
        //         const attributeName = attributeCriteria.name;
        //         const attributeValue = attributeCriteria.value;
        //
        //         if (attributeName === null || attributeName === "") {
        //             const errorMsg =
        //                 "error: no attribute name specified in attribute filter criteria";
        //             console.log(errorMsg);
        //             return errorHandler(errorMsg);
        //         }
        //
        //         if (attributeValue === null || attributeValue === "") {
        //             const errorMsg =
        //                 "error: no attribute value specified in attribute filter criteria";
        //             console.log(errorMsg);
        //             return errorHandler(errorMsg);
        //         }
        //
        //         const queryAttribute = new Attribute();
        //         queryAttribute.setName(attributeName);
        //         queryAttribute.setValue(attributeValue);
        //         snapshotQuery.addAttributeclauses(queryAttribute);
        //         console.log(
        //             "adding attribute clause name: " +
        //             attributeName +
        //             " value: " +
        //             attributeValue);
        //         valid = true;
        //     }
        // }

        let pvPattern = "";
        if (filter.pvCriteriaList.length > 0) {
            if (filter.pvCriteriaList.length > 1) {
                // the API only allows a single PV query pattern
                const errorMsg = "error: PV criteria list unexpectedly contains more than one element";
                console.log(errorMsg);
                return errorHandler(errorMsg);
            }
            const pvCriteria = filter.pvCriteriaList[0];
            pvPattern = pvCriteria.pattern;
            valid = true;
        }

        // check if query is valid, e.g., at least one filter applied
        if (!valid) {
            const errorMsg = "error: no filter criteria specified";
            console.log(errorMsg);
            return errorHandler(errorMsg);
        }

        console.log("pvPattern: " + pvPattern);

        let query = new Query();
        query.setQuery(pvPattern);
        // execute query
        this.client.listPVs(query, {}, (err, response) => {

            if (err) {
                return this.handleApiError(err, errorHandler);

            } else {
                let resultList = response?.getPvsList() || [];
                console.log(
                    "PV metadata query success, result length: " +
                    resultList.length);
                if (resultList.length === 0) {
                    const errorMsg = "query result is empty";
                    console.log(errorMsg);
                    return noResultHandler(errorMsg);
                }
                resultList = resultList
                    .map((pv) => {
                        return new Pv(pv);
                    });
                return resultHandler(resultList);
            }
        });
    }

}

module.exports = DatastoreApi
