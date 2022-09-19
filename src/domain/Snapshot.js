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

    get firstTimestampSeconds() {
        return this.apiSnapshot.getFirst().getEpochseconds();
    }

    get snapshotTimestampNanos() {
        return this.apiSnapshot.getFirst().getNanoseconds();
    }

    get lastTimestampSeconds() {
        return this.apiSnapshot.getLast().getEpochseconds();
    }

    get lastTimestampNanos() {
        return this.apiSnapshot.getLast().getNanoseconds();
    }
}

module.exports = Snapshot