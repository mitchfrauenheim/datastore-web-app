class Constants {}

Constants.ID = "id";
Constants.FIRSTTIME = "firstTime"
Constants.LASTTIME = "lastTime"
Constants.ATTRIBUTENAME = "attName"
Constants.ARRRIBUTEVALUE = "attValue"
Constants.PVPATTERN = "pvPattern"
Constants.PVNAME = "name"
Constants.ANNOTATIONPATTERN = "annotationPattern"
Constants.ANNOTATIONNAME = "name"
Constants.SNAPSHOTDATAPAGESIZE = 100

Object.freeze(Constants); // make constants immutable

module.exports = Constants