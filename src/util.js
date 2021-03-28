export const metersToMiles = meters => {
  return meters * 0.00062137;
};

export const calcPercentGrade = (elevationChange, distanceChange) => {
  // assumes elevation and distance are the same units
  return (elevationChange / distanceChange) * 100;
};

// Uphill: every % incline slows down 15 seconds per mile (can range 12-15)
// Downhill: every % decline increase 8 seconds per mile
export const calcTimeDiff = (percentGrade, distance) => {
  if (percentGrade > 0) {
    return metersToMiles(distance) * 15 * percentGrade;
  } else if (percentGrade < 0) {
    return metersToMiles(distance) * 8 * percentGrade;
  } else {
    return 0;
  }
};

export const cleanRoutePoints = routePoints => {
  return routePoints.map(routePoint => {
    return {
      lat: parseFloat(routePoint.lat[0]),
      lon: parseFloat(routePoint.lon[0]),
      ele: parseFloat(routePoint.ele[0])
    }
  })
};

export const calcTotalTimeDiff = (routePoints, geolib) => {
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
