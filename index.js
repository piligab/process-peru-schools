var fs = require('fs')
var turf = require('turf')
var _ = require('underscore')
var file = argv.schools
var grid = argv.grid
var folder = argv.folder
var format = require('./format')
var tags = require('./tags')

function split() {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFile, 'utf8', function(err, features) {
      features = JSON.parse(features)
      fs.readFile(grid, 'utf8', function(err, poligons) {
        var output = {}
        poligons = JSON.parse(poligons)
        console.log(poligons.features.length);
        for (var z = 0; z < poligons.features.length; z++) {
          var poli = poligons.features[z]
          for (var i = 0; i < features.features.length; i++) {
            if (turf.inside(features.features[i], poli)) {
              features.features[i] = format(features.features[i])
              features.features[i] = tags(features.features[i])
              console.log(poli.properties.id);
              if (output[poli.properties.id]) {
                output[poli.properties.id].push(features.features[i])
              } else {
                output[poli.properties.id] = [features.features[i]]
              }
            }
          }
        }
        return resolve(output)
      })
    })
  })
}

split().then(response => {
  for (var grid in response) {
    console.log('save...' + grid);
    var objs = {
      'type': 'FeatureCollection',
      'features': response[grid]
    }
    fs.writeFileSync(folder + grid + '.geojson', JSON.stringify(objs));
  }
}).catch(console.log);
