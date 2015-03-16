/*!!
 *
 * gulp options
 * @author: Pedro Vega
 *
 */

var path = require('./path');

var Options = {};

Options.clean = {
	general : {
		plugin : {
			force : true
		},
		src : {
			read : false
		}
	}
};

Options.hint = {
  jshint : {
    jshintrc      : './gulp/.jshintrc',
    reporter      : 'fail',
    reporterStyle : 'jshint-stylish'
  }
};

module.exports = Options;