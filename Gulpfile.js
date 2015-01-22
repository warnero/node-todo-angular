var gulp = require('gulp'),
    gutil = require('gulp-util'),
    inject = require("gulp-inject"),
    angularFilesort = require("gulp-angular-filesort"),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean')
    ngConstant = require('gulp-ng-constant');

var using = require('gulp-using')

var config = require( './build.config.js' );
// JSHint task
// gulp.task('lint', function() {
//   gulp.src('./app/scripts/*.js')
//   .pipe(jshint())
//   // You can look into pretty reporters as well, but that's another story
//   .pipe(jshint.reporter('default'));
// });

gulp.task('scripts', ['ng-config'], function() {
    var scriptsToLoad = config.vendor_files.js;
    scriptsToLoad.push('./app/scripts/**/*.js');
    gulp.src(scriptsToLoad)
        // .pipe(angularFilesort())
        // .pipe(browserify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
    gulp.src(['./app/styles/main.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
})
gulp.task('views', function() {
    var appJs = gulp.src('dist/js/app.js', {read: false});
    var configJs = gulp.src('dist/js/ng-config.js', {read:false});
    appJs.pipe(using());
    configJs.pipe(using());
    gulp.src("./app/index.html")
        .pipe(inject(appJs, {name: 'app', ignorePath:'dist/'}))
        .pipe(inject(configJs, {name:'config', ignorePath:'dist/'}))
        .pipe(inject(gulp.src('dist/css/main.css', {read: false}), {name:'app', ignorePath:'dist/'}))
        // .pipe(embedlr())
        .pipe(using())
        .pipe(gulp.dest('dist/'));

    // Any other view files from app/views
    gulp.src('./app/views/**/*')
        // Will be put in the dist/views folder
        .pipe(gulp.dest('dist/views/'));
});

gulp.task('ng-config', function(){
    var devConstants = config.ng_constants.development;
    gulp.src('ng-config.json')
        .pipe(ngConstant({
          name: 'config',
          constants: devConstants
        }))
        .pipe(gulp.dest('dist/js'))
});

// Browserify task
// gulp.task('browserify', function() {
//   // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
//   gulp.src(['app/scripts/main.js'])
//   .pipe(browserify({
//     insertGlobals: true,
//     debug: true
//   }))
//   // Bundle to a single file
//   .pipe(concat('bundle.js'))
//   // Output it to our dist folder
//   .pipe(gulp.dest('dist/js'));
// });

// gulp.task('watch', ['lint'], function() {
//   // Watch our scripts
//   gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
//     'lint',
//     'browserify'
//   ]);
// });

// Views task
// gulp.task('views', function() {
//   // Get our index.html
//   gulp.src('app/index.html')
//   // And put it in the dist folder
//   .pipe(gulp.dest('dist/'));

//   // Any other view files from app/views
//   gulp.src('./app/views/**/*')
//   // Will be put in the dist/views folder
//   .pipe(gulp.dest('dist/views/'))
//   .pipe(refresh(lrserver));
// });

// run server
gulp.task( 'server:start', function() {
    server.listen( { path: 'app.js', execArgv: [ '--harmony' ] } );
});

// restart server and then livereload
gulp.task( 'sever:restart', function() {
    gulp.src( 'app.js' )
        .pipe( server() )
        .pipe( livereload() ); 
});

// watching server scripts 
gulp.task( 'watch', [ 'server:start' ], function() {
     gulp.watch( [ 'app.js'], [ 'server:restart' ] );
});

gulp.task('dev', function() {
    // gulp.run('scripts', 'styles', 'views', 'server:start');
    gulp.run('scripts', 'styles', 'views');
    // gulp.watch('app/scripts/**', function(event) {
    //     gulp.run('scripts');
    // });
 
    // gulp.watch('app/styles/**', function(event) {
    //     gulp.run('styles');
    // });
 
    // gulp.watch(['app/index.html', 'app/views/**/*.html'], [
    //   'views'
    // ]);
})
// // Dev task
// gulp.task('dev', function() {
//   // Start webserver
//   server.listen(serverport);
//   // Start live reload
//   lrserver.listen(livereloadport);
//   // Run the watch task, to keep taps on changes
//   gulp.run('watch');
// });