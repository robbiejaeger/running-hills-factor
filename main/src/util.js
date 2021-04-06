"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const metersToMiles = exports.metersToMiles = meters => {
  return meters * 0.00062137;
};

const calcPercentGrade = exports.calcPercentGrade = (segmentElevationDiff, segmentDistance) => {
  // assumes elevation and distance are the same units
  return segmentElevationDiff / segmentDistance * 100;
}; // Uphill: every % incline slows down 15 seconds per mile (can range 12-15)
// Downhill: every % decline increase 8 seconds per mile


const calcTimeDiff = exports.calcTimeDiff = (segmentPercentGrade, segmentDistance, inclineFactor, declineFactor) => {
  if (segmentPercentGrade > 0) {
    return metersToMiles(segmentDistance) * -1 * inclineFactor * segmentPercentGrade;
  } else if (segmentPercentGrade < 0) {
    return metersToMiles(segmentDistance) * declineFactor * Math.abs(segmentPercentGrade);
  } else {
    return 0;
  }
};

const cleanRoutePoints = exports.cleanRoutePoints = routePoints => {
  return routePoints.map(routePoint => {
    return {
      lat: parseFloat(routePoint.lat[0]),
      lon: parseFloat(routePoint.lon[0]),
      ele: parseFloat(routePoint.ele[0])
    };
  });
};

const calcTotalTimeDiff = exports.calcTotalTimeDiff = (routePoints, getDistance, inclineFactor, declineFactor) => {
  return routePoints.reduce((timeDiffAcc, routePoint, i) => {
    if (i === 0) {
      return timeDiffAcc;
    }

    let segmentElevationDiff = routePoints[i].ele - routePoints[i - 1].ele;
    let segmentStart = {
      latitude: routePoints[i - 1].lat,
      longitude: routePoints[i - 1].lon
    };
    let segmentEnd = {
      latitude: routePoints[i].lat,
      longitude: routePoints[i].lon
    };
    let segmentDistance = getDistance(segmentStart, segmentEnd, 0.1);
    let segmentPercentGrade = calcPercentGrade(segmentElevationDiff, segmentDistance);
    let segmentTimeDiff = calcTimeDiff(segmentPercentGrade, segmentDistance, inclineFactor, declineFactor);
    return timeDiffAcc += segmentTimeDiff;
  }, 0);
};