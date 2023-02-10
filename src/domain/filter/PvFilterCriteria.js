import FilterCriteriaBase from "./FilterCriteriaBase";

export default class PvFilterCriteria extends FilterCriteriaBase {

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
        return "PV Name: " + this._pattern;
    }

}
