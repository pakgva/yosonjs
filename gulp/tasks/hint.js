/*!!
*
* Tareas individuales para limpiar los archivos generados
*
* tarea principal: hint
*/

function Task(gulp, path, options, plugins, settings){

  gulp.task('hint:jshint', function(){
    return gulp.src(path.hint.jshint)
           .pipe(plugins.jshint(options.hint.jshint.jshintrc))
           .pipe(plugins.jshint.reporter(options.hint.jshint.reporterStyle))
           .pipe(plugins.jshint.reporter(options.hint.jshint.reporter));
  });

  gulp.task('hint:complexity', function(){
    return gulp.src(path.hint.complexity)
           .pipe(plugins.complexity())
  });

  gulp.task('hint', function(cb){
    plugins.runSequence(['hint:jshint', 'hint:complexity'], cb);
  });

}

module.exports = Task;