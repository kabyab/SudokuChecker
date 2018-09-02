/**
 * 
 * Helpers used by our sudoku checker
 * 
 */

// Container to store all helper functions
var helpers = {}

// The first nine primes with an offset in the beginning
var primes = [0, 2, 3, 5, 7, 11, 13, 17, 19, 23];

// The product of the first nine primes, is always unique (Fundamental theorem of Arithmetic)
var primeProduct = 2 * 3 * 5 * 7 * 11 * 13 * 17 * 19 * 23;

// Trim the array of empty rows
helpers.trimEmptyRows = function(array, callback) {
    if (array instanceof Array) {
        var trimmedArray = [];
        for (var elem of array) {
            if (elem.length !== 0)
                trimmedArray.push(elem);
        }
        callback(false, trimmedArray);
    } else {
        callback(true, array);
    }
};

// Break the array of strings into a 2D array of integers
helpers.createInteger2DArray = function(array, callback) {
    if (array instanceof Array) {
        var integer2DArray = [];
        for (var row of array) {
            integer2DArray.push(row.split('').map(val => parseInt(val)));
        }
        callback(false, integer2DArray);
    } else {
        callback(true, array);
    }
};

// Check if Sudoku solution is a 9x9 grid
helpers.checkSudokuArrayValidity = function(array, callback) {
    if (array instanceof Array && array.length === 9) {
        var arrayIsValid = true;
        for (var elem of array) {
            if (elem.length === 9) 
                continue;
            else {
                arrayIsValid = false;
                break;
            }
        }
        if (arrayIsValid) {
            callback(false);
        } else {
            callback(true);
        }
    } else {
        callback(true);
    }
};

// Check if all rows of the sudoku are valid
helpers.checkSudokuRowValidity = function(array, callback) {
    if (array instanceof Array) {
        var arrayIsValid = true;
        for (var row of array) {
            
            // We map every integer in the row to a prime, and then calculate their product
            // If a row would contain all the integers from 1-9 then this product will always be same,
            // and equal to the primeProduct. Thus we can easily check if a particular row contains
            // all nine integers from 1-9.
            if (row.reduce((a, b) => a * primes[b], 1) === primeProduct) {
                continue;
            } else {
                arrayIsValid = false;
                break;
            }
        }
        
        if (arrayIsValid) {
            callback(false);
        } else {
            callback(true);
        }
    } else {    
        callback(true);
    }
};

// Transpose the array (Proper Array transposition)
helpers.transposeArray = function(array, callback) {
    if (array instanceof Array) {
        callback(false, Object.keys(array[0]).map(col => {
            return array.map(row => row[col]);
        }));
    } else {
        callback(true, array);
    }
};

// Create a 2D array where every row is a 3x3 grid of the Sudoku solution
helpers.create3X3GridFromArray = function(array, callback) {
    if (array instanceof Array) {
        var outputArray = [];

        // :( 
        for (var i = 0; i < 9; i = i + 3) {
            for (var j = 0; j < 9; j = j + 3) {
                var tempArray = [array[i][j], array[i + 1][j], array[i + 2][j], 
                                 array[i][j+1], array[i+1][j+1], array[i+2][j+1], 
                                 array[i][j+2], array[i+1][j+2], array[i+2][j+2]];
                outputArray.push(tempArray);
            }
        }
        callback(false, outputArray);
    } else {
        callback(true, array);
    }
};

// Export the container for other files to use
module.exports = helpers;