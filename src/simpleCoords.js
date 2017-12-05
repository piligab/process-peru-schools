var fs = require('fs')
var turf = require('@turf/turf')
var _ = require('underscore')
var cover = require('@mapbox/tile-cover');
var rbush = require('rbush');
var poly = require('./peru.json')
module.exports = function(file) {
	var polygons = JSON.parse(fs.readFileSync(file, 'utf8'));
	for (var i = 0; i < polygons.features.length; i++) {
		var coordinates = polygons.features[i].geometry.coordinates[0];
		for (var k = 0; k < coordinates.length; k++) {
			var coords = coordinates[k];
			coords[0] = parseFloat(coords[0].toFixed(4));
			coords[1] = parseFloat(coords[1].toFixed(4));
		}
		polygons.features[i].geometry.coordinates[0] = coordinates;
	}
	process.stdout.write(JSON.stringify(polygons) + '\n')
}