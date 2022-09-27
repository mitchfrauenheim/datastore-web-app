const SnapshotDataRow = require("./SnapshotDataRow");
const TimeRangeFilterCriteria = require("./TimeRangeFilterCriteria");

class SnapshotMetadataFilter {

    constructor() {
        this.timeRangeCriteria = null;
    }

    addTimeRangeCriteria(firstTime, lastTime) {
        console.log("adding time range criteria to domain");
        this.timeRangeCriteria = new TimeRangeFilterCriteria(firstTime, lastTime);
    }

    get criteriaList() {
        console.log("generating criteriaList");
        let result = []
        if (this.timeRangeCriteria !== null) {
            result.push(this.timeRangeCriteria.displayString);
        }
        return result;
    }

}

module.exports = SnapshotMetadataFilter