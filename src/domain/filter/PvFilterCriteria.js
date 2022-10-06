const FilterCriteriaBase = require("./FilterCriteriaBase");

class PvFilterCriteria extends FilterCriteriaBase {

    constructor(pvPattern) {
        super();
        this.pattern = pvPattern;
    }

    get pattern() {
        return this._pattern;
    }

    set pattern(pvPattern) {
        this._pattern = pvPattern;
    }

    get displayString() {
        return "Snapshot contains PV with name(s) matching: " + this._pattern;
    }

}

module.exports = PvFilterCriteria