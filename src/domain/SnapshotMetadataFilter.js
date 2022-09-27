const SnapshotDataRow = require("./SnapshotDataRow");
const TimeRangeFilterCriteria = require("./TimeRangeFilterCriteria");

class SnapshotMetadataFilter {

    constructor() {
        this.timeRangeCriteria = null;
    }

    addTimeRangeCriteria(firstTime, lastTime) {
        console.log("SnapshotMetadataFilter.addTimeRangeCriteria()");
        this.timeRangeCriteria = new TimeRangeFilterCriteria(firstTime.current.value, lastTime.current.value);
    }

    get criteriaList() {
        console.log("SnapshotMetadataFilter.criteriaList()");
        let result = []
        if (this.timeRangeCriteria !== null) {
            result.push(this.timeRangeCriteria.displayString);
        }
        return result;
    }

}

module.exports = SnapshotMetadataFilter