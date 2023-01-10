import FilterCriteriaBase from "./FilterCriteriaBase";

export default class AnnotationFilterCriteria extends FilterCriteriaBase {

    constructor(annotationNamePattern) {
        super();
        this._annotationNamePattern = annotationNamePattern;
    }

    get annotationNamePattern() {
        return this._annotationNamePattern;
    }

    set annotationNamePattern(annotationNamePattern) {
        this._annotationNamePattern = annotationNamePattern;
    }

    get displayString() {
        return "Annotation name matches: " + this._annotationNamePattern;
    }

}
