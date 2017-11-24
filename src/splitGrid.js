var fs = require('fs')
var turf = require('@turf/turf')
var _ = require('underscore')
var cover = require('@mapbox/tile-cover');
var rbush = require('rbush');
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
	var objGrid = {};
	var output = {};
	var points = JSON.parse(fs.readFileSync(file, 'utf8'));
	var polys = cover.geojson(poly.features[0].geometry, limits);
	var tiles = cover.tiles(poly.features[0].geometry, limits);
	var polyBboxes = [];
	var pointBboxes = [];
	var objects = {};
	for (var i = 0; i < polys.features.length; i++) {
		var poli = polys.features[i];
		poli.properties.id = tiles[i].join('');
		polyBboxes.push(objBbox(poli));
		objects[poli.properties.id] = poli;
	}
	for (var p = 0; p < points.features.length; p++) {
		var point = points.features[p];
		var id = p + 'p';
		pointBboxes.push(objBbox(point, p + 'p'));
		objects[id] = point;
	}
	var bboxes = pointBboxes.concat(polyBboxes)
	var tree = rbush(bboxes.length);
	tree.load(bboxes);
	var output = {};
	for (var j = 0; j < bboxes.length; j++) {
		var bbox = bboxes[j];
		var poli = objects[bbox.id];
		if (poli.geometry.type === 'Polygon') {
			var overlaps = tree.search(bbox);
			for (var i = 0; i < overlaps.length; i++) {
				overlap = overlaps[i];
				if (overlap.id !== bbox.id) {
					var point = objects[overlap.id];
					if (point.geometry.type === 'Point') {
						if (turf.inside(point, poli)) {
							if (output[poli.properties.id]) {
								output[poli.properties.id].push(point);
							} else {
								output[poli.properties.id] = [point];
							}
							objGrid[poli.properties.id] = poli;
						}
					}
				}
			}
		}
	}

	geoGrid.features = _.values(objGrid)
	fs.writeFileSync(file.split('.')[0] + '-' + zoom + '-grid.geojson', JSON.stringify(geoGrid));
	for (var grid in output) {
		var objs = {
			'type': 'FeatureCollection',
			'features': output[grid]
		}
		fs.writeFileSync(folder + '/' + grid + '.geojson', JSON.stringify(objs));
	}
}

function objBbox(feature, id) {
	var bboxExtent = ['minX', 'minY', 'maxX', 'maxY'];
	var bbox = {};
	var valBbox = turf.bbox(feature);
	for (var d = 0; d < valBbox.length; d++) {
		bbox[bboxExtent[d]] = valBbox[d];
	}
	bbox.id = id || feature.properties.id;
	return bbox;
}