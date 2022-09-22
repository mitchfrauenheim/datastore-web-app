const SnapshotDataRow = require("./SnapshotDataRow");

class SnapshotDataPage {

    constructor(apiPaginatedResponse) {
        this.apiPaginatedResponse = apiPaginatedResponse;
        this.snapshotDataRowList = null;
    }

    get timestampsList() {
        return this.apiPaginatedResponse.getTimestampsList();
    }

    get labelsList() {
        return this.apiPaginatedResponse.getLabelsList();
    }

    get snapshotDataRowList() {
        if (this._snapshotDataRowList === null) {
            let columnList = this.apiPaginatedResponse.getColumnsList();
            let snapshotDataRowList = []
            let rowIndex = 0;
            for (const timestamp of this.timestampsList) {
                console.log(timestamp.getEpochseconds(), timestamp.getNanoseconds());
                let rowDataList = [];
                for (const column of columnList) {
                    let columnDataList = column.getDataList();
                    let columnDatum = columnDataList[rowIndex];
                    let columnDatumCase = columnDatum.getValueOneofCase();
                    let columnDatumValue = null;
                    switch (columnDatumCase) {
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

module.exports = SnapshotDataPage
