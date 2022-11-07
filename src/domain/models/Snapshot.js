const {epochSecondsToLocaleString, epochSecondsToIsoString} = require("../utils/timestamp-utils");

class Snapshot {

    constructor(apiSnapshot) {
        this.apiSnapshot = apiSnapshot;
        this._durationMillis = null;
        this._millisPerTimestamp = null;
    }

    get id() {
        return this.apiSnapshot.getId();
    }

    get size() {
        return this.apiSnapshot.getSize();
    }

    get durationMillis() {
        if (this._durationMillis === null) {
            this._durationMillis = this.lastTimestampAsMillis - this.firstTimestampAsMillis;
        }
        return this._durationMillis;
    }

    get millisPerTimestamp() {
        if (this._millisPerTimestamp === null) {
            this._millisPerTimestamp = ( this.durationMillis / this.size);
        }
        return this._millisPerTimestamp;
    }

    get snapshotTimestampSeconds() {
        return this.apiSnapshot.getSnapshottimestamp().getEpochseconds();
    }

    get snapshotTimestampNanos() {
        return this.apiSnapshot.getSnapshottimestamp().getNanoseconds();
    }

    get snapshotTimestampLocaleString() {
        return epochSecondsToLocaleString(this.snapshotTimestampSeconds);
    }

    get snapshotTimestampIsoString() {
        return epochSecondsToIsoString(this.snapshotTimestampSeconds);
    }

    get firstTimestampSeconds() {
        return this.apiSnapshot.getFirst().getEpochseconds();
    }

    get firstTimestampNanos() {
        return this.apiSnapshot.getFirst().getNanoseconds();
    }

    get firstTimestampAsMillis() {
        // combine seconds and nanos, and return as millis for use in the API
        return (this.firstTimestampSeconds * 1000)
            + (Math.round(this.firstTimestampNanos/1000000));
    }

    get firstTimestampLocaleString() {
        return epochSecondsToLocaleString(this.firstTimestampSeconds);
    }

    get firstTimestampIsoString() {
        return epochSecondsToIsoString(this.firstTimestampSeconds);
    }

    get lastTimestampSeconds() {
        return this.apiSnapshot.getLast().getEpochseconds();
    }

    get lastTimestampNanos() {
        return this.apiSnapshot.getLast().getNanoseconds();
    }

    get lastTimestampAsMillis() {
        // combine seconds and nanos, and return as millis for use in the API
        return (this.lastTimestampSeconds * 1000)
            + (Math.round(this.lastTimestampNanos/1000000));
    }

    get lastTimestampLocaleString() {
        return epochSecondsToLocaleString(this.lastTimestampSeconds);
    }

    get lastTimestampIsoString() {
        return epochSecondsToIsoString(this.lastTimestampSeconds);
    }

    get pvNames() {
        return this.apiSnapshot.getPvsList();
    }

    get pvNamesString() {
        return this.apiSnapshot.getPvsList().join(', ');
    }

    get attributePairStrings() {
        let pairStrings = [];
        for (const attribute of this.apiSnapshot.getAttributesList()) {
            let attyName = attribute.getName();
            let attyVal = attribute.getValue();
            pairStrings.push(attyName + " => " + attyVal);
        }
        return pairStrings;
    }

}

module.exports = Snapshot