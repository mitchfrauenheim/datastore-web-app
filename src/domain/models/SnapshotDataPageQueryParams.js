export default class SnapshotDataPageQueryParams {

    constructor(
        snapshot,
        minFirstTime,
        maxLastTime,
        selectClause,
        idClause,
        availablePvsList,
        timestampsPerPage,
        millisPerTimestamp,
        pageRangeMillis) {

        this.snapshot = snapshot;
        this.minFirstTime = minFirstTime;
        this.maxLastTime = maxLastTime;
        this.selectClause = selectClause;
        this.idClause = idClause;
        this.availablePvsList = availablePvsList;
        this.timestampsPerPage = timestampsPerPage;
        this.millisPerTimestamp = millisPerTimestamp;
        this.pageRangeMillis = pageRangeMillis;
    }

}
