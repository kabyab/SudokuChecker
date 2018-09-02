/**
 * 
 * Library for reading input files from .inp folder
 * 
 */

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for the module to be exported
var lib = {};

// Base directory of the .inp folder
lib.baseDir = path.join(__dirname, '/../.inp/');

// Read the sudoku data from a file
lib.read = function(file, ext, enc, callback) {
    fs.readFile(lib.baseDir + '/' + file + ext, enc, function(err, data) {
        if (!err && data) {
            callback(false, data);
        } else {
            callback(err, data);
        }
    });
};

// Export the created library for other files
module.exports = lib;

