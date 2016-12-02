// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp    = require('gulp');                  // Gulp, of course
var babel   = require('gulp-babel');            // For transpiling
var es2015  = require('babel-preset-es2015');   // From ES6 to native (ES5)
var del     = require('del');                   // For deleting files
var es      = require('event-stream');          // Merge gulp streams
var runSeq  = require('run-sequence');          // Run gulp tasks in order
var ghPages = require('gulp-gh-pages');         // Publish to a gh-pages branch
var connect = require('gulp-connect');          // Run a dev server

// Nuke the /dist folder
gulp.task('clean', function () {
    return del(['dist/**/*.*']);
});

// Copy static resources and assets (not javascripts) to the /dist folder
gulp.task('copy', function () {
    return es.concat(
        gulp.src(['src/**/*.*', '!src/js/**/*.*'])
            .pipe(gulp.dest('dist')),
        gulp.src(['src/*.*'])
            .pipe(gulp.dest('dist')),
        gulp.src(['package.json'])
            .pipe(gulp.dest('dist'))
    );
});

// Transpile JS from ES6 to ES5 (babel configuration in .babelrc)
gulp.task('babel', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});

// To handle scripts, just run babel (this could be extended by running other tasks,
// such as minification, etc.)
gulp.task('scripts', ['babel']);

// This task copies the npm installations of libraries that will be used in the front end.
// The module installations are copied to /dest/lib, where they can be included/referenced
// with a regular script tag in index.html
gulp.task('frontend', function() {
    var frontendPackages = ["babel-polyfill", "systemjs", "foundation-sites", "jquery", "paper", "justmath"];

    var glob = "node_modules/+(" + frontendPackages.join("|") + ")/**/*";

    return gulp.src([glob])
        .pipe(gulp.dest('dist/lib'));
});

// Tell gulp to watch files for changes, and run certain tasks on change.
// When resources change, re-copy them; when scripts change, recompile them.
gulp.task('watch', function() {
    gulp.watch(['src/**/*.*', '!src/js/**/*.*'], ['copy']);
    gulp.watch('src/js/*.js', ['scripts']);
});

// Run a dev server
gulp.task('server', function() {
    return connect.server({
        root: 'dist'
    });
});

// Deploy the /dist folder to the gh-pages branch of the working repo
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

// Just compile the site into /dist
gulp.task('dist', function(cb) {
    runSeq('clean', ['copy', 'frontend', 'scripts'], cb);
});

// The regular top level task does the following in order:
gulp.task('default', function(cb) {
    runSeq('clean', ['copy', 'frontend', 'scripts'], 'watch', 'server', cb);
});
