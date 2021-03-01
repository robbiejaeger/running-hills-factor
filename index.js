const fs = require('fs');
const xml2js = require('xml2js');
const getDistance = require('geolib').getDistance;

const parser = new xml2js.Parser({mergeAttrs: true});

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

    const routePoints = result.gpx.rte[0].rtept;

    const timeDiff = routePoints.reduce((timeDiffAcc, routePoint, i) => {
      if (i === 0) {
        return timeDiffAcc;
      }

      let elevationDiff = parseFloat(routePoints[i].ele[0]) - parseFloat(routePoints[i-1].ele[0]);

      let start = {latitude: parseFloat(routePoints[i-1].lat[0]), longitude: parseFloat(routePoints[i-1].lon[0])};
      let end = {latitude: parseFloat(routePoints[i].lat[0]), longitude: parseFloat(routePoints[i].lon[0])};
      let distanceDiff = getDistance(start, end, 0.1);

      return timeDiffAcc += distanceDiff;
    }, 0);

    console.log('Time difference (sec): ', timeDiff);
  });
});
