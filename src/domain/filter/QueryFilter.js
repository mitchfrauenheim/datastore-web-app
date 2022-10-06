const SnapshotDataRow = require("../models/SnapshotDataRowModel");
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

    get timeRangeCriteriaButtonLabel() {
        console.log("QueryFilter.timeRangeCriteriaButtonLabel()");
        if (this.timeRangeCriteria === null) {
            return "Add";
        } else {
            return "Update";
        }
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
            result.push(this.timeRangeCriteria);
        }
        for (const attributeCriteria of this.attributeCriteriaList) {
            result.push(attributeCriteria);
        }
        if (this.pvCriteria !== null) {
            result.push(this.pvCriteria);
        }
        return result;
    }

    deleteCriteria(criteria) {
        console.log("QueryFilter.deleteCriteria()");
        if (this.timeRangeCriteria === criteria) {
            console.log("deleting time range criteria: " + criteria.displayString);
            this.timeRangeCriteria = null;
        } else if (this.pvCriteria === criteria) {
            console.log("deleting pv criteria: " + criteria.displayString);
            this.pvCriteria = null;
        } else {
            let index = this.attributeCriteriaList.indexOf(criteria);
            if (index !== -1) {
                console.log("deleting attribute criteria: " + criteria.displayString);
                this.attributeCriteriaList.splice(index, 1);
            }
        }
    }

}

module.exports = QueryFilter