import { epochSecondsToLocaleString } from "../utils/timestamp-utils";

export default class SnapshotDataRowModel {

    constructor(timestamp, columnValueList) {
        this.timestamp = timestamp;
        this.columnValueList = columnValueList;
    }

    get timestampSeconds() {
        return this.timestamp.getEpochseconds();
    }

    get timestampNanos() {
        return this.timestamp.getNanoseconds();
    }

    get timestampLocaleString() {
        return epochSecondsToLocaleString(this.timestampSeconds);
    }

    get columnValueList() {
        return this._columnValueList;
    }

    set columnValueList(columnValueList) {
        this._columnValueList = columnValueList;
    }

}
