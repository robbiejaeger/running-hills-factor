const fs = require('fs');

fs.readFile('../../../Downloads/test.gpx', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  console.log(data);
})
