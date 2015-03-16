var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
      'yoson-core': '../src/core',
      'yoson-comps-comunicator': '../src/comps/communicator',
      'yoson-comps-dependency': '../src/comps/dependency',
      'yoson-comps-dependency-manager': '../src/comps/dependency-manager',
      'yoson-comps-loader': '../src/comps/loader',
      'yoson-comps-modular': '../src/comps/modular',
      'yoson-comps-modular-manager': '../src/comps/modular-manager',
      'yoson-comps-sequential': '../src/comps/sequential',
      'yoson-comps-single-promise': '../src/comps/single-promise',
      'schema-demo': 'scripts/schema-demo.js'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
