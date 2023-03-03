import FilterCriteriaBase from "./FilterCriteriaBase";

export default class AttributeFilterCriteria extends FilterCriteriaBase {

    constructor(name, value) {
        super();
        this.name = name;
        this.value = value;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get displayString() {
        return "Attribute: {" + this._name + ": " + this._value + "}";
    }

}
