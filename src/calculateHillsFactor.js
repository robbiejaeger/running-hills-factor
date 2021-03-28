import xml2js from 'xml2js';
import geolib from 'geolib';
import { readFile } from 'fs/promises';
import {
  metersToMiles,
  calcPercentGrade,
  calcTimeDiff,
  cleanRoutePoints,
  calcTotalTimeDiff
} from './util';

const xmlParser = new xml2js.Parser({mergeAttrs: true});

const calculateHillsFactor = filepath => {
  return readFile(filepath, 'utf8')
    .then(xml => {
      let formattedTimeDiff;
      xmlParser.parseString(xml, (err, result) => {
        if (err) {
          console.error(err);
          return
        }

        let routePoints = cleanRoutePoints(result.gpx.rte[0].rtept);

        let timeDiff = calcTotalTimeDiff(routePoints, geolib);

        formattedTimeDiff = timeDiff.toFixed(1);
      });
      return formattedTimeDiff;
    })
    .catch(err => console.error(err));
};

export default calculateHillsFactor;
