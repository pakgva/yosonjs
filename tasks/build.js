module.exports = function(grunt){

    var glog = grunt.log.writeln,
        gvlog = grunt.verbose.writeln,
        requirejs = require("requirejs"),
        requirejsConfig = {
            name: "core",
            baseUrl:"src",
            optimize: "none",
            //findNestedDependencies : true,
            //skipSemiColonInsertion: true,
            out:"build/yoson.js"
        };
        configContribConcat = grunt.config.get("concat"),
        requireDefineEnd = /\}\);[^}\w]*$/;

    var readComponents = function(){
        var files = configContribConcat.dist.src;
        //for(var index = 0;index < files.length; index++){
        var fileContent = grunt.file.read(files[0], { encoding: 'utf8' });
        var newContent = fileContent.replace(/define\([\w\W]*?return/, "var" + (/var\/([\w-]+)/.exec(name)[1]) + " =");
        var contentFooter = newContent.replace(requireDefineEnd, "");
        glog(fileContent);
        //}
    };

    var convertComps = function(name, path, contents){
        return contents;
    };

    var readCompsWithRequireJS = function(){
        //requirejsConfig.onBuildWrite = convertComps;
        requirejs.optimize(requirejsConfig, function(response){
            console.log(":D", response);
        });
    };

    var taskConcatenate = function(){
        //readComponents();
        //convertcomps();
        readCompsWithRequireJS();
    };
    //register the task
    grunt.registerTask("concatenate", "concatenate the components",taskConcatenate);
};
