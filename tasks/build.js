module.exports = function(grunt){

    var glog = grunt.log.writeln,
        configContribConcat = grunt.config.get("concat");

    var readComponents = function(){
        var files = configContribConcat.dist.src;
        for(var index = 0;index < files.length; index++){
            glog(files[index]);
        }
    };

    var taskConcatenate = function(){
        readComponents();
    };
    //register the task
    grunt.registerTask("concatenate", "concatenate the components",taskConcatenate);
};
