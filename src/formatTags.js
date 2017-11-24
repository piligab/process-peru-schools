var fs = require('fs')
var _ = require('underscore')
  // var file = argv.schools
  // var grid = argv.grid
  // var folder = argv.folder
var format = require('./format')
var tags = require('./tags')

module.exports = function(file) {
  var geojson = {
    'type': 'FeatureCollection',
    'features': []
  }
  fs.readFile(file, 'utf8', function(err, res) {
    geo = JSON.parse(res)
    for (var i = 0; i < geo.features.length; i++) {
      geo.features[i] = format.replaceSC(geo.features[i]);
      var obj = tags(geo.features[i])
      if (obj) {
        geo.features[i] = obj;
        geojson.features.push(geo.features[i]);
      }
    }
    process.stdout.write(JSON.stringify(geojson) + '\n')
  })


}