const SnapshotDataRow = require("./SnapshotDataRow");

class SnapshotMetadataFilter {

    constructor() {
        this.criteriaList = null;
    }

    get criteriaList() {
        return this._criteriaList;
    }

    set criteriaList(criteriaList) {
        this._criteriaList = criteriaList;
    }
}

module.exports = SnapshotMetadataFilter