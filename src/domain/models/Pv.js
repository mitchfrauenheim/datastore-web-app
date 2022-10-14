class Pv {

    constructor(apiPv) {
        this.apiPv = apiPv;
    }

    get name() {
        return this.apiPv.getName();
    }

    get attributesString() {
        let description = "";
        let first = true;
        for (const attribute of this.apiPv.getAttributesList()) {
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
}

module.exports = Pv