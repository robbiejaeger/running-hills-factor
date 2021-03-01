const fs = require('fs');
const xml2js = require('xml2js');
const getDistance = require('geolib').getDistance;

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

fs.readFile('../../../Downloads/test.gpx', 'utf8', (err, xml) => {
  if (err) {
    console.error(err);
    return
  }

  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error(err);
      return
    }

    const routePoints = cleanRoutePoints(result.gpx.rte[0].rtept);

    const timeDiff = routePoints.reduce((timeDiffAcc, routePoint, i) => {
      if (i === 0) {
        return timeDiffAcc;
      }

      let elevationDiff = routePoints[i].ele - routePoints[i-1].ele;

      let start = {latitude: routePoints[i-1].lat, longitude: routePoints[i-1].lon};
      let end = {latitude: routePoints[i].lat, longitude: routePoints[i].lon};
      let distanceDiff = getDistance(start, end, 0.1);

      return timeDiffAcc += metersToMiles(distanceDiff);
    }, 0);

    console.log('Time difference (sec): ', timeDiff);
  });
});
