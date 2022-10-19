const {epochSecondsToLocaleString} = require("../utils/timestamp-utils");

class Snapshot {

    constructor(apiSnapshot) {
        this.apiSnapshot = apiSnapshot;
    }

    get id() {
        return this.apiSnapshot.getId();
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

    get firstTimestampSeconds() {
        return this.apiSnapshot.getFirst().getEpochseconds();
    }

    get firstTimestampNanos() {
        return this.apiSnapshot.getFirst().getNanoseconds();
    }

    get firstTimestampLocaleString() {
        return epochSecondsToLocaleString(this.firstTimestampSeconds);
    }

    get lastTimestampSeconds() {
        return this.apiSnapshot.getLast().getEpochseconds();
    }

    get lastTimestampNanos() {
        return this.apiSnapshot.getLast().getNanoseconds();
    }

    get lastTimestampLocaleString() {
        return epochSecondsToLocaleString(this.lastTimestampSeconds);
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