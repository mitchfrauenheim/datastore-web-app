const TimeRangeFilterCriteria = require("./TimeRangeFilterCriteria");
const AttributeFilterCriteria = require("./AttributeFilterCriteria");
const PvFilterCriteria = require("./PvFilterCriteria");
const FilterConstants = require("../Constants");

class QueryFilter {

    constructor() {
        this.reset();
    }

    reset() {
        this.timeRangeCriteria = null;
        this.attributeCriteriaList = [];
        this.pvCriteriaList = [];
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
        this.pvCriteriaList.push(new PvFilterCriteria(pvPattern));
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
        for (const pvCriteria of this.pvCriteriaList) {
            result.push(pvCriteria);
        }
        return result;
    }

    addUrlParams(params) {

        console.log("QueryFilter.addUrlParams()");

        if (this.timeRangeCriteria !== null) {
            const firstTime = this.timeRangeCriteria.firstTime;
            const lastTime = this.timeRangeCriteria.lastTime;
            if (firstTime !== null) {
                params[FilterConstants.FIRSTTIME] = firstTime;
            }
            if (lastTime !== null) {
                params[FilterConstants.LASTTIME] = lastTime;
            }
        }

        let attributeCount = 1;
        for (const attributeCriteria of this.attributeCriteriaList) {
            const attributeName = FilterConstants.ATTRIBUTENAME + attributeCount;
            const attributeValue = FilterConstants.ARRRIBUTEVALUE + attributeCount;
            params[attributeName] = attributeCriteria.name;
            params[attributeValue] = attributeCriteria.value;
            attributeCount = attributeCount + 1;
        }

        let pvCount = 1;
        for (const pvCriteria of this.pvCriteriaList) {
            const pvPattern = pvCriteria.pattern;
            if (pvPattern !== null) {
                const pvCriteriaName = FilterConstants.PVPATTERN + pvCount;
                params[pvCriteriaName] = pvPattern;
                pvCount = pvCount + 1;
            }
        }

    }

    get urlParams() {
        console.log("QueryFilter.urlParams()");
        let params = {};
        this.addUrlParams(params);
        return params;
    }

    initFromUrlParams(searchParams) {

        this.reset();

        // handle time range params
        const firstTime = searchParams.get(FilterConstants.FIRSTTIME);
        const lastTime = searchParams.get(FilterConstants.LASTTIME);
        if (firstTime !== null && lastTime !== null) {
            this.addTimeRangeCriteria(firstTime, lastTime);
        }

        // handle attribute params
        let attributeCount = 1;
        let foundAttributeCriteria = true;
        while (foundAttributeCriteria) {
            const attributeName = FilterConstants.ATTRIBUTENAME + attributeCount;
            const attributeValue = FilterConstants.ARRRIBUTEVALUE + attributeCount;
            const attributeNameParam = searchParams.get(attributeName);
            const attributeValueParam = searchParams.get(attributeValue);
            if (attributeNameParam != null && attributeValueParam != null) {
                this.addAttributeCriteria(attributeNameParam, attributeValueParam);
                foundAttributeCriteria = true;
                attributeCount = attributeCount + 1;
            }  else {
                foundAttributeCriteria = false;
            }
        }

        // handle pv param
        let pvCount = 1;
        let foundPvCriteria = true;
        while (foundPvCriteria) {
            const pvCriteriaName = FilterConstants.PVPATTERN + pvCount;
            const pvPattern = searchParams.get(pvCriteriaName);
            if (pvPattern !== null) {
                this.addPvCriteria(pvPattern);
                foundPvCriteria = true;
                pvCount = pvCount + 1;
            } else {
                foundPvCriteria = false;
            }
        }

    }

    deleteCriteria(criteria) {
        console.log("QueryFilter.deleteCriteria()");
        if (this.timeRangeCriteria === criteria) {
            console.log("deleting time range criteria: " + criteria.displayString);
            this.timeRangeCriteria = null;
        } else {
            let index = this.pvCriteriaList.indexOf(criteria);
            if (index !== -1) {
                console.log("deleting pv criteria: " + criteria.displayString);
                this.pvCriteriaList.splice(index, 1);
            } else {
                let index = this.attributeCriteriaList.indexOf(criteria);
                if (index !== -1) {
                    console.log("deleting attribute criteria: " + criteria.displayString);
                    this.attributeCriteriaList.splice(index, 1);
                }
            }
        }
    }

}

module.exports = QueryFilter