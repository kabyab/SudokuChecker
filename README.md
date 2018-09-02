# SudokuChecker

This project helps check if your Sudoku solution is valid.

### Requirements

This project requires [NodeJS](https://nodejs.org/) version `8.10.x` or above.

### Startup

Clone the repo. Then add a `.txt` file to the `.inp` folder, which contains the solution of the sudoku as `9X9` 2D array. Somethings like this:

```txt
589714263
637829514
241536987
496258731
853197642
712643859
965471328
324985176
178362495
```

Then go to the `lib\config.js` file and type in the `fileName`, `extension` and `encoding` in the places provided. Right now I have a test file called `input.txt` in my `.inp` folder, thus my `lib\config.js` file looks like this:
```js
var config = {};
config.values = {
    'fileName': 'input',
    'extension': '.txt',
    'encoding': 'utf8'
};
module.exports = config;
```

Once done, open up a command prompt at the root directory and type in `node index.js` to see the validity of your solution.