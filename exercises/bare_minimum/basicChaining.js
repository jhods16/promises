/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification.js');
var promiseConstructor = require('./promiseConstructor.js');
var promiseWriteFile = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    resolve(promiseConstructor.pluckFirstLineFromFileAsync(readFilePath));
    // if (err) {
    //   reject(promiseConstructor.pluckFirstLineFromFileAsync(readFilePath));
    // } else {
    //   resolve(promiseConstructor.pluckFirstLineFromFileAsync(readFilePath));
    // }
  })
  // then, promisification.getGitHubProfileAsync(username)
    .then(function(result) {
      return promisification.getGitHubProfileAsync(result);
    })
  // then, fswriteFile(writeFilePath, result)
    .then(function(result) {
      return promiseWriteFile(writeFilePath, JSON.stringify(result));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
