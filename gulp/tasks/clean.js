/*!!
*
* Tareas individuales para limpiar los archivos generados
*
* tarea principal: clean
*/

function Task(gulp, path, options, plugins, settings){

  gulp.task('clean:build', function(cb){
    plugins.del(path.clean.build, cb);
  });

  gulp.task('clean:dist', function(cb){
    plugins.del(path.clean.dist, cb);
  });

  gulp.task('clean', function(cb){
    plugins.runSequence(['clean:build', 'clean:dist'], cb);
  });

}

module.exports = Task;