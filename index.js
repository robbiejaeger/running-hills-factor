const fs = require('fs');
const xml2js = require('xml2js');

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

    console.log(result.gpx.rte[0].rtept);
  });
});
