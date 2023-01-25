import {epochMillisToIsoString, epochSecondsToLocaleString} from "../utils/timestamp-utils";

export default class Pv {

    constructor(apiPv) {
        this.apiPv = apiPv;
    }

    static fieldTypeNameForTypeNum( fieldTypeNum ) {
        switch( fieldTypeNum ) {
            case 0:
                return "float";
                break;
            case 1:
                return "string";
                break;
            case 2:
                return "integer";
                break;
            case 3:
                return "boolean";
                break;
            case 4:
                return "structure";
                break;
            case 5:
                return "image";
                break;
            case 6:
                return "array";
                break;
            case 7:
                return "byte array";
                break;
            default:
                return "unknown field type";
                break;
        }
    }

    get name() {
        return this.apiPv.getName();
    }

    get fieldNameTypeStringList() {
        let nameTypeStringList = [];
        for (const field of this.apiPv.getFieldsList()) {
            const fieldName = field.getName();
            const fieldTypeName = Pv.fieldTypeNameForTypeNum(field.getType());
            nameTypeStringList.push(fieldName + " => " + fieldTypeName);
        }
        return nameTypeStringList;
    }

    get firstTimestampSeconds() {
        return this.apiPv.getFirst().getEpochseconds();
    }

    get firstTimestampNanos() {
        return this.apiPv.getFirst().getNanoseconds();
    }

    get firstTimestampAsMillis() {
        // combine seconds and nanos, and return as millis
        return (this.firstTimestampSeconds * 1000)
            + (Math.round(this.firstTimestampNanos/1000000));
    }

    get firstTimestampLocaleString() {
        return epochSecondsToLocaleString(this.firstTimestampSeconds);
    }

    get firstTimestampIsoString() {
        return epochMillisToIsoString(this.firstTimestampAsMillis);
    }

    get firstTimestampDisplayString() {
        return this.firstTimestampIsoString;
    }

    get lastTimestampSeconds() {
        return this.apiPv.getLast().getEpochseconds();
    }

    get lastTimestampNanos() {
        return this.apiPv.getLast().getNanoseconds();
    }

    get lastTimestampAsMillis() {
        // combine seconds and nanos, and return as millis
        return (this.lastTimestampSeconds * 1000)
            + (Math.round(this.lastTimestampNanos/1000000));
    }

    get lastTimestampLocaleString() {
        return epochSecondsToLocaleString(this.lastTimestampSeconds);
    }

    get lastTimestampIsoString() {
        return epochMillisToIsoString(this.lastTimestampAsMillis);
    }

    get lastTimestampDisplayString() {
        return this.lastTimestampIsoString;
    }

    get providerId() {
        return this.apiPv.getProviderid();
    }

    get attributeNameList() {
        return this.apiPv.getAttributes().getNameList();
    }

}
