export default class FilterCriteriaBase {

    constructor() {
        if (this.constructor == FilterCriteriaBase) {
            throw new Error("Abstract class FilterCriteriaBase can't be instantiated.");
        }
    }

    get displayString() {
        throw new Error("Method 'displayString()' must be implemented.");
    }

}
