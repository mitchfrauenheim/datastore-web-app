const SnapshotDataRow = require("./SnapshotDataRowModel");
const TimeRangeFilterCriteria = require("./TimeRangeFilterCriteria");
const AttributeFilterCriteria = require("./AttributeFilterCriteria");
const PvFilterCriteria = require("./PvFilterCriteria");

class QueryFilter {

    constructor() {
        this.timeRangeCriteria = null;
        this.attributeCriteriaList = [];
        this.pvCriteria = null;
    }

    addTimeRangeCriteria(firstTime, lastTime) {
        console.log("QueryFilter.addTimeRangeCriteria()");
        this.timeRangeCriteria = new TimeRangeFilterCriteria(firstTime, lastTime);
    }

    addAttributeCriteria(attributeName, attributeValue) {
        console.log("QueryFilter.addAttributeCriteria()");
        this.attributeCriteriaList.push(new AttributeFilterCriteria(attributeName, attributeValue));
    }

    addPvCriteria(pvPattern) {
        console.log("QueryFilter.addPvCriteria()");
        this.pvCriteria = new PvFilterCriteria(pvPattern);
    }

    get criteriaList() {
        console.log("QueryFilter.criteriaList()");
        let result = []
        if (this.timeRangeCriteria !== null) {
            result.push(this.timeRangeCriteria.displayString);
        }
        for (const attributeCriteria of this.attributeCriteriaList) {
            result.push(attributeCriteria.displayString);
        }
        if (this.pvCriteria !== null) {
            result.push(this.pvCriteria.displayString);
        }
        return result;
    }

}

module.exports = QueryFilter