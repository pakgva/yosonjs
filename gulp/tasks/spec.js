/*!!
*
* Tareas individuales para limpiar los archivos generados
*
* tarea principal: spec
*/

function Task(gulp, path, options, plugins, settings){

  gulp.task('connect', function(){
    plugins.connect.server();
  });

  gulp.task('jasmine', function(cb){
    return gulp.src(path.spec.jasmine)
           .pipe(plugins.jasmine({
            reporter: new plugins.reporters.JUnitXmlReporter()
           }));
  });

  gulp.task('spec', function(cb){
    plugins.runSequence(['connect', 'jasmine'], cb);
  });
}

module.exports = Task;