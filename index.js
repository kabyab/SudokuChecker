/**
 * 
 * Sudoku solution checker, Main file.
 * 
 */

// Dependecies
var _data = require('./lib/data');
var _helpers = require('./lib/helpers');
var _config = require('./lib/config');

_data.read(_config.values.fileName, _config.values.extension, _config.values.encoding, function(err, data) {
    if (!err && data) {
        // Split the input by line
        var dataArray = data.split('\r\n');
        var trimmedData = [];

        // Remove empty rows from the input array if any
        _helpers.trimEmptyRows(dataArray, function(err, trimmedArray) {
            if (err) {
                throw new Error('The program encountered an error');
            } else {
                trimmedData = trimmedArray;
            }
        });

        // Check if sudoku is valid
        _helpers.checkSudokuArrayValidity(trimmedData, function(err) {
            if (!err) {
                _helpers.createInteger2DArray(trimmedData, function(err, intergerArray) {
                    if(!err) {
                        _helpers.checkSudokuRowValidity(intergerArray, function(err) {
                            if (!err) {
                                _helpers.transposeArray(intergerArray, function(err, transposedArray) {
                                    if (!err) {
                                        _helpers.checkSudokuRowValidity(transposedArray, function(err) {
                                            if (!err) {
                                                _helpers.create3X3GridFromArray(intergerArray, function(err, finalArray) {
                                                    if (!err) {
                                                        _helpers.checkSudokuRowValidity(finalArray, function(err) {
                                                            if (!err) {
                                                                console.log('The solution is valid');
                                                            } else {
                                                                console.log('The solution is invalid!');                                
                                                            }
                                                        });
                                                    } else {
                                                        console.log('The solution is invalid!');                                
                                                    }
                                                });
                                            } else {
                                                console.log('The solution is invalid!');                        
                                            }
                                        });
                                    } else {    
                                        console.log('The solution is invalid!');                
                                    }
                                });
                            } else {
                                console.log('The solution is invalid!');        
                            }
                        });
                    } else {
                        console.log('The solution is invalid!');
                    }
                });
            } else {
                console.log('The solution is invalid!');
            }
        });
        
        // console.log('Data: ', trimmedData);
    } else {
        console.log('Process terminated with error: ', err);
    }
});