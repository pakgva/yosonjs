module.exports = function(grunt){

    var glog = grunt.log.writeln,
        gvlog = grunt.verbose.writeln,
        requirejs = require("requirejs"),
        requirejsConfig = {
            name: "core",
            baseUrl:"src",
            optimize: "none",
            findNestedDependencies : true,
            skipSemiColonInsertion: true,
            out:"build/yoson.js",
            wrap: {
                start: "",
                end:"return yOSON;})(yOSON);"
            }
        },
        requireDefineEnd = /return (.+;)(\n|\t| )+\}\);?(\n|\t| )*$/;

    var convertComps = function(name, path, contents){
        console.log('name', name);
        contents = contents.replace( /define\([^{]*?{/, "").replace(requireDefineEnd, "");
        if(name == "yoson"){
            contents = contents + " (function(namespace){";
        }
        return contents;
    };

    var taskConcatenate = function(){
        var taskDone = this.async();
        requirejsConfig.onBuildWrite = convertComps;
        requirejs.optimize(requirejsConfig, function(response){
            console.log(response);
            taskDone();
        });
    };
    //register the task
    grunt.registerTask("concatenate", "concatenate the components",function(){
        taskConcatenate.call(this);
    });
};
