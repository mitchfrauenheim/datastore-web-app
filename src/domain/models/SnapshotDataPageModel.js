const SnapshotDataRow = require("./SnapshotDataRowModel");

class SnapshotDataPageModel {

    constructor(apiPaginatedResponse, snapshotPvList, firstTimeMillis, lastTimeMillis, pageQueryParams) {

        this.apiPaginatedResponse = apiPaginatedResponse;
        this.snapshotPvList = snapshotPvList;
        this.firstTimeMillis = firstTimeMillis;
        this.lastTimeMillis = lastTimeMillis;
        this.pageQueryParams = pageQueryParams;
        this._labelsList = null;
        this._columnPvsList = null;
        this._snapshotDataRowList = null;
    }

    get timestampsList() {
        return this.apiPaginatedResponse.getTimestampsList();
    }

    get labelsList() {
        if (this._labelsList === null) {
            this._labelsList = []
            this._labelsList.push("timestamp");
            Array.prototype.push.apply(this._labelsList, this.columnPvsList);
        }
        return this._labelsList;
    }

    get columnPvsList() {
        if (this._columnPvsList === null) {
            // remove PVs that are not part of the snapshot.
            this._columnPvsList = []
            for (const label of this.apiPaginatedResponse.getLabelsList()) {
                if (this.snapshotPvList.includes(label)) {
                    this._columnPvsList.push(label);
                }
            }
        }
        return this._columnPvsList;
    }

    get snapshotDataRowList() {
        if (this._snapshotDataRowList === null) {
            let columnList = this.apiPaginatedResponse.getColumnsList();
            let snapshotDataRowList = []
            let rowIndex = 0;
            for (const timestamp of this.timestampsList) {
                let rowDataList = [];
                for (const label of this.columnPvsList) {
                    // find column with label and add to output
                    const column = columnList.find(c => c.getName() === label);
                    let columnDataList = column.getDataList();
                    let columnDatum = columnDataList[rowIndex];
                    let columnDatumCase = columnDatum.getValueOneofCase();
                    let columnDatumValue = null;
                    switch (columnDatumCase) {
                        case 0:
                            // no value for this timestamp
                            columnDatumValue = 'no data value';
                            break;
                        case 1:
                            columnDatumValue = columnDatum.getStringvalue();
                            break;
                        case 3:
                            columnDatumValue = columnDatum.getFloatvalue();
                            break;
                        case 4:
                            columnDatumValue = columnDatum.getIntvalue();
                            break;
                        case 5:
                            // columnDatumValue = columnDatum.getBytearrayvalue();
                            columnDatumValue = "byte array";
                            break;
                        case 6:
                            columnDatumValue = columnDatum.getBooleanvalue();
                            break;
                        case 7:
                            // columnDatumValue = columnDatum.getBytearrayvalue();
                            columnDatumValue = "image";
                            break;
                        case 8:
                            columnDatumValue = "status";
                            break;
                        case 10:
                            columnDatumValue = "structure";
                            break;
                        case 11:
                            columnDatumValue = "array";
                            break;
                        default:
                            columnDatumValue = "unhandled datum case: " + columnDatumCase;
                            break;
                    }
                    rowDataList.push(columnDatumValue);
                }
                snapshotDataRowList.push(new SnapshotDataRow(timestamp, rowDataList));
                rowIndex = rowIndex + 1;
            }
            this._snapshotDataRowList = snapshotDataRowList;
        }
        return this._snapshotDataRowList;
    }

    set snapshotDataRowList(snapshotDataRowList) {
        this._snapshotDataRowList = snapshotDataRowList;
    }
}

module.exports = SnapshotDataPageModel
