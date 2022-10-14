class Constants {}

Constants.ID = "id";
Constants.FIRSTTIME = "firstTime"
Constants.LASTTIME = "lastTime"
Constants.ATTRIBUTENAME = "attName"
Constants.ARRRIBUTEVALUE = "attValue"
Constants.PV = "pvPattern"

Object.freeze(Constants); // make constants immutable

module.exports = Constants