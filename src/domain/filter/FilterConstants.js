class FilterConstants {}

FilterConstants.FIRSTTIME = "firstTime"
FilterConstants.LASTTIME = "lastTime"
FilterConstants.ATTRIBUTENAME = "attName"
FilterConstants.ARRRIBUTEVALUE = "attValue"
FilterConstants.PV = "pvPattern"

Object.freeze(FilterConstants); // make constants immutable

module.exports = FilterConstants