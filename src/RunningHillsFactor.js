import xml2js from 'xml2js';
import geolib from 'geolib';
import { readFile } from 'fs/promises';
import {
  metersToMiles,
  calcPercentGrade,
  calcTimeDiff,
  cleanRoutePoints,
  calcTotalTimeDiff
} from './util.js';

export default class RunningHillsFactor {
  constructor(options = {}) {
    this.inclineFactor = options.inclineFactor || 15;
    this.declineFactor = options.declineFactor || 8;
  };

  calculateHillsFactor = filepath => {
    const xmlParser = new xml2js.Parser({mergeAttrs: true});

    return readFile(filepath, 'utf8')
      .then(xml => {
        let formattedTimeDiff;
        xmlParser.parseString(xml, (err, result) => {
          if (err) {
            console.error(err);
            return
          }

          let routePoints = cleanRoutePoints(result.gpx.rte[0].rtept);

          let timeDiff = calcTotalTimeDiff(routePoints, geolib, this.inclineFactor, this.declineFactor);

          formattedTimeDiff = timeDiff.toFixed(1);
        });
        return formattedTimeDiff;
      })
      .catch(err => console.error(err));
  }
};
