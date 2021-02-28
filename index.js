const fs = require('fs');
const parseString = require('xml2js').parseString;

fs.readFile('../../../Downloads/test.gpx', 'utf8' , (err, xml) => {
  if (err) {
    console.error(err);
    return
  }

  parseString(xml, (err, result) => {
    console.log(result.gpx.rte[0].rtept);
  });
})
