/*!!
 *
 * gulp path
 * @author: Pedro Vega
 *
 */

var Path = {};

Path.clean = {
 	build : 'build/',
 	dist  : 'dist/'
};

Path.hint = {
  jshint : [
    'src/**/*.js',
    'spec/**/*.js',
    '!src/yoson.js'
  ],
  complexity : [
    "src/**/*.js"
  ]
};

Path.spec = {
  jasmine: [
    "test/spec/*.js"
  ]
};

module.exports = Path;