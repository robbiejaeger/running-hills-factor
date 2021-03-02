import fs from 'fs';
import xml2js from 'xml2js';
import geolib from 'geolib';

const parser = new xml2js.Parser({mergeAttrs: true});

const metersToMiles = meters => {
  return meters * 0.00062137;
};

const cleanRoutePoints = routePoints => {
  return routePoints.map(routePoint => {
    return {
      lat: parseFloat(routePoint.lat[0]),
      lon: parseFloat(routePoint.lon[0]),
      ele: parseFloat(routePoint.ele[0])
    }
  })
};

const calcPercentGrade = (elevationChange, distanceChange) => {
  // assumes elevation and distance are the same units
  return (elevationChange / distanceChange) * 100;
};

// Uphill: every % incline slows down 12-15 second per mile
// Downhill: every % decline increase 8 seconds per mile
const calcTimeDiff = (percentGrade, distance) => {
  if (percentGrade > 0) {
    return metersToMiles(distance) * -15;
  } else if (percentGrade < 0) {
    return metersToMiles(distance) * 8;
  } else {
    return 0;
  }
};

const calcTotalTimeDiff = routePoints => {
  return routePoints.reduce((timeDiffAcc, routePoint, i) => {
    if (i === 0) {
      return timeDiffAcc;
    }

    let elevationDiff = routePoints[i].ele - routePoints[i-1].ele;

    let start = {latitude: routePoints[i-1].lat, longitude: routePoints[i-1].lon};
    let end = {latitude: routePoints[i].lat, longitude: routePoints[i].lon};
    let distanceDiff = geolib.getDistance(start, end, 0.1);

    let percentGrade = calcPercentGrade(elevationDiff, distanceDiff);

    let timeDiff = calcTimeDiff(percentGrade, distanceDiff);

    return timeDiffAcc += timeDiff;
  }, 0);
}

fs.readFile('../../../Downloads/uphill-2mi.gpx', 'utf8', (err, xml) => {
  if (err) {
    console.error(err);
    return
  }

  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error(err);
      return
    }

    let routePoints = cleanRoutePoints(result.gpx.rte[0].rtept);

    let timeDiff = calcTotalTimeDiff(routePoints);

    console.log('Time difference (sec): ', timeDiff);
  });
});
