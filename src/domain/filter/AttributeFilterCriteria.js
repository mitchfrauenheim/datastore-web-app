const FilterCriteriaBase = require("./FilterCriteriaBase");

class AttributeFilterCriteria extends FilterCriteriaBase {

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
        return "Attribute name is: " + this._name + " and value like: " + this._value;
    }

}

module.exports = AttributeFilterCriteria