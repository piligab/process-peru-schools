var fs = require('fs');
var turf = require('@turf/turf');
var _ = require('underscore');
var cover = require('@mapbox/tile-cover');
module.exports = function(file, zoom) {
  var polygon = JSON.parse(fs.readFileSync(file, 'utf8'));

  var limits = {
    min_zoom: zoom,
    max_zoom: zoom
  };

  var polys = cover.geojson(polygon.features[0].geometry, limits);


  // var tiles = cover.tiles(polygon.geometry.coordinates, limits);
  
  //console.log(polys)
  console.log(JSON.stringify(polys));
};