/**
 * 
 * Sudoku solution checker, Main file.
 * 
 */

// Dependecies
var _data = require('./lib/data');
var _helpers = require('./lib/helpers');
var _config = require('./lib/config');

// Read the input file to get the solution
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

        // Sudoku Validation checks begin
        //-------------------------------------------------------------------------
        // Check if we have a 9x9 grid to start with
        _helpers.checkSudokuArrayValidity(trimmedData, function(err) {
            if (!err) {
                // Convert the array of strings to a 2D array of integers
                _helpers.createInteger2DArray(trimmedData, function(err, intergerArray) {
                    if(!err) {
                        // Check if all rows of the Sudoku solution are valid
                        _helpers.checkSudokuRowValidity(intergerArray, function(err) {
                            if (!err) {
                                // Transpose the 9x9 grid so now columns are rows and vice-versa
                                _helpers.transposeArray(intergerArray, function(err, transposedArray) {
                                    if (!err) {
                                        // Check if all columns of the Sudoku solution are valid
                                        _helpers.checkSudokuRowValidity(transposedArray, function(err) {
                                            if (!err) {
                                                // Transform the 9x9 2Darray into a 9x9 2Darray where every row is a 3x3 grid of the Sudoku
                                                _helpers.create3X3GridFromArray(intergerArray, function(err, finalArray) {
                                                    if (!err) {
                                                        // Check if every 3x3 grid of the sudoku is valid
                                                        _helpers.checkSudokuRowValidity(finalArray, function(err) {
                                                            if (!err) {
                                                                // And thus the sudoku is valid
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
    } else {
        console.log('Process terminated with error: ', err);
    }
});
