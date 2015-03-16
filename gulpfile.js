/*!!
 *
 * gulpfile.js
 * @author: Pedro Vega
 *
 */

var gulp    = require('gulp'),
    path    = require('./gulp/path'),
    options = require('./gulp/options'),
    settings = {
        browserSync : require('browser-sync'),
        notify      : require("node-notifier"),
        changelog   : require('conventional-changelog'),
        fs          : require('fs'),
        loadPlugins : require('gulp-load-plugins'),
        package     : require('./package.json')
    },
    plugins = settings.loadPlugins(),
    runTask = function (nameTask){
        var Task = require("./gulp/tasks/" + nameTask);
        return new Task(gulp, path, options, plugins, settings);
    };

plugins.runSequence = require('run-sequence');
plugins.es          = require('event-stream');
plugins.Buffer      = require('buffer').Buffer;
plugins.del         = require('del');
plugins.reporters   = require('jasmine-reporters');

runTask("clean");
runTask("hint");
runTask("spec");
runTask("coverage");
runTask("dist");
runTask("build");
runTask("doc");
runTask("watch");
runTask("version");

gulp.task('default', ['clean'], function(cb){
	plugins.runSequence('spec', 'dist', 'build', 'doc', cb);
});