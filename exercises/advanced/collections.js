/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var Promise = require('bluebird');
var fs = require('fs');
var promiseConst = require('../bare_minimum/promiseConstructor.js');
var _ = require('lodash');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  //iterate through filePaths
  //  pluck the first line from each file 
  return new Promise(function(resolve, reject) {
    var data = _.map(filePaths, (filePath) => {
      return promiseConst.pluckFirstLineFromFileAsync(filePath);
    });

    resolve(Promise.all(data).then((values) => {
      // for each line in the array of values
      // write to writePath file
      var allValues = values.join('\n');
      fs.writeFile(writePath, allValues, (err) => {
        if (err) {
          throw ('error writing file');
        }
      });
    }));
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};