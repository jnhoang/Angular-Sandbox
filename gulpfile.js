var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

var config = {
  autoprefix      : {
    browsers : ['last 2 versions'],
    cascade  : false
  },
  browserSync     : {
    server: {
      baseDir: './app/'
    }
  },
  reload          : { 
    stream: true 
  },
  srcHtml         : [
    'index.html', 
    'app/components/**/*.html'
  ],
  srcScript       : [
    'gulpfile.js', 
    'app/js/**/*.js', 
    'app/components/**/*.js',
    '!app/js/**/*.min.js'
  ],
  srcStyle        : 'app/css/style.css',
  watchHtml       : [
    'app/components/**/*.html',
    'app/index.html'
  ],
  watchScript     : [
    'gulpfile.js', 
    'app/js/**/*.js',
    'app/components/**/*.js'
  ],
  watchStyle      : 'app/css/style.css'
};



/* HTML TASKS */
gulp.task('htmls', function() {
  gulp
  .src(config.srcHtml)
  .pipe(reload(config.reload));
});



/* STYLE TASKS */
gulp.task('styles', function() {
  gulp
  .src(config.srcStyle)
  .pipe(autoprefixer(config.autoprefix))
  .pipe(reload(config.reload));
});




/* SCRIPT TASKS */
gulp.task('scripts', function() {
  gulp
  .src(config.srcScript)
  .pipe(reload(config.reload));
});




/* WATCH TASKS */
gulp.task('watch', function() {
  gulp.watch(config.watchScript, ['scripts']);
  gulp.watch(config.watchStyle , ['styles' ]);
  gulp.watch(config.watchHtml  , ['htmls'  ]);
});




/* BROWSERSYNC TASKS */
gulp.task('browser-sync', function() {
  browserSync(config.browserSync);
});



/* DEFAULT */
gulp.task('default', ['htmls', 'browser-sync', 'styles', 'watch']);