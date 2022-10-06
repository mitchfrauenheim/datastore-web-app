const FilterCriteriaBase = require("./FilterCriteriaBase");

class TimeRangeFilterCriteria extends FilterCriteriaBase {

    constructor(firstTime, lastTime) {
        super();
        this.firstTime = firstTime;
        this.lastTime = lastTime;
    }

    get firstTime() {
        return this._firstTime;
    }

    set firstTime(firstTime) {
        this._firstTime = firstTime;
    }

    get lastTime() {
        return this._lastTime;
    }

    set lastTime(lastTime) {
        this._lastTime = lastTime;
    }

    get displayString() {
        return "Snapshot trigger time is between: " + this._firstTime + " and " + this._lastTime;
    }

}

module.exports = TimeRangeFilterCriteria