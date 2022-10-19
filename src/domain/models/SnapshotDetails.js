class SnapshotDetails {

    constructor(id, timestamp, firstTime, lastTime, pvNames, pvNamesString, attributePairStrings) {
        this.id = id;
        this.timestamp = timestamp;
        this.firstTime = firstTime;
        this.lastTime = lastTime;
        this.pvNames = pvNames;
        this.pvNamesString = pvNamesString;
        this.attributePairStrings = attributePairStrings;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(timestamp) {
        this._timestamp = timestamp;
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

    get pvNames() {
        return this._pvNames;
    }

    set pvNames(pvNames) {
        this._pvNames = pvNames;
    }

    get pvNamesString() {
        return this._pvNamesString;
    }

    set pvNamesString(pvNamesString) {
        this._pvNamesString = pvNamesString;
    }

    get attributePairStrings() {
        return this._attributePairStrings;
    }

    set attributePairStrings(attributePairStrings) {
        this._attributePairStrings = attributePairStrings;
    }

}

module.exports = SnapshotDetails