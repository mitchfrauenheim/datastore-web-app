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

    get descAttributes() {
        return this.apiSnapshot.getAttributesList();
    }

    get descriptionString() {
        let description = "";
        let first = true;
        for (const attribute of this.apiSnapshot.getAttributesList()) {
            let attyName = attribute.getName();
            let attyVal = attribute.getValue();
            if (!first) {
                description = description + "\n";
            } else {
                first = false;
            }
            description = description + attyName + " => " + attyVal;
        }
        return description;
    }

    get descriptionStringWithBreaks() {
        let description = "";
        let first = true;
        for (const attribute of this.apiSnapshot.getAttributesList()) {
            let attyName = attribute.getName();
            let attyVal = attribute.getValue();
            if (!first) {
                description = description + "<br>";
            } else {
                first = false;
            }
            description = description + attyName + " => " + attyVal;
        }
        return description;
    }
}

module.exports = Snapshot