class Annotation {

    constructor(apiAnnotation) {
        this.apiAnnotation = apiAnnotation;
    }

    get name() {
        return this.apiAnnotation.getName();
    }

    get query() {
        return this.apiAnnotation.getQuery();
    }

}

module.exports = Annotation