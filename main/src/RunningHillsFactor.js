"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xml2js = require("xml2js");

var xml2js = _interopRequireDefault(_xml2js).default;

var _geolib = require("geolib");

var getDistance = _geolib.getDistance;

var _promises = require("fs/promises");

var readFile = _promises.readFile;

var _util = require("./util.js");

var metersToMiles = _util.metersToMiles;
var calcPercentGrade = _util.calcPercentGrade;
var calcTimeDiff = _util.calcTimeDiff;
var cleanRoutePoints = _util.cleanRoutePoints;
var calcTotalTimeDiff = _util.calcTotalTimeDiff;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RunningHillsFactor {
  constructor(options = {}) {
    _defineProperty(this, "calculateHillsFactor", filepath => {
      const xmlParser = new xml2js.Parser({
        mergeAttrs: true
      });
      return readFile(filepath, 'utf8').then(xml => {
        let formattedTimeDiff;
        xmlParser.parseString(xml, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }

          let routePoints = cleanRoutePoints(result.gpx.rte[0].rtept);
          let timeDiff = calcTotalTimeDiff(routePoints, getDistance, this.inclineFactor, this.declineFactor);
          formattedTimeDiff = timeDiff.toFixed(1);
        });
        return formattedTimeDiff;
      }).catch(err => console.error(err));
    });

    this.inclineFactor = options.inclineFactor || 15;
    this.declineFactor = options.declineFactor || 8;
  }

}

exports.default = RunningHillsFactor;
;
module.exports = exports['default'];