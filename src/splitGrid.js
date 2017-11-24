var fs = require('fs')
var turf = require('turf')
var _ = require('underscore')
var cover = require('@mapbox/tile-cover');
var poly = require('./peru.json')
module.exports = function(file, folder, zoom) {
	var limits = {
		min_zoom: zoom,
		max_zoom: zoom
	};
	var geoGrid = {
		'type': 'FeatureCollection',
		'features': []
	}
	var output = {};
	var points = JSON.parse(fs.readFileSync(file, 'utf8'));
	var geojson = cover.geojson(poly.features[0].geometry, limits);
	var tiles = cover.tiles(poly.features[0].geometry, limits);
	for (var i = 0; i < geojson.features.length; i++) {
		var poli = geojson.features[i];
		poli.properties.id = tiles[i].join('');
		for (var p = 0; p < points.features.length; p++) {
			points.features[p];
			if (turf.inside(points.features[p], poli)) {
				if (output[poli.properties.id]) {
					output[poli.properties.id].push(points.features[p]);
				} else {
					output[poli.properties.id] = [points.features[p]];
				}
				geoGrid.features.push(poli);
			}
		}
	}
	for (var grid in output) {
		// console.log('save...subl' + grid);
		var objs = {
			'type': 'FeatureCollection',
			'features': output[grid]
		}
		fs.writeFileSync(folder + '/' + grid + '.geojson', JSON.stringify(objs));
	}
	fs.writeFileSync(file.split('.')[0] + '-grid.geojson', JSON.stringify(geoGrid));
}