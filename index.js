#!/usr/bin/env node

'use strict'
var program = require('commander')
var argv = require('minimist')(process.argv.slice(2))
var formatTags = require('./src/formatTags')
var splitGrid = require('./src/splitGrid')

program
	.version('0.0.1')
	.option('-f, --formatTags', 'formatTags')
	.option('-s, --splitGrid', 'split to grid')
	.parse(process.argv)

var file = process.argv.slice(2)[1]
var folder = process.argv.slice(2)[2]

if (program.formatTags) {
	formatTags(file)
}
if (program.splitGrid) {
	splitGrid(file, folder, argv.zoom)
}