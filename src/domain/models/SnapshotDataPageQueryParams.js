class SnapshotDataPageQueryParams {

    constructor(
        minFirstTime,
        maxLastTime,
        selectClause,
        availablePvsList,
        timestampsPerPage,
        millisPerTimestamp,
        pageRangeMillis) {

        this.minFirstTime = minFirstTime;
        this.maxLastTime = maxLastTime;
        this.selectClause = selectClause;
        this.availablePvsList = availablePvsList;
        this.timestampsPerPage = timestampsPerPage;
        this.millisPerTimestamp = millisPerTimestamp;
        this.pageRangeMillis = pageRangeMillis;
    }

}

module.exports = SnapshotDataPageQueryParams