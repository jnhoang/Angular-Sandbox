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
  htmlSrc         : [
    'index.html', 
    'app/components/**/*.html'
  ],
  reload          : { 
    stream: true 
  },
  scriptSrc       : [
    'gulpfile.js', 
    'app/js/**/*.js', 
    'app/components/**/*.js',
    '!app/js/**/*.min.js'
  ],
  watchHtml       : 'app/components/**/*.html',
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
  .src(config.htmlSrc)
  .pipe(reload(config.reload));
});



/* STYLE TASKS */
gulp.task('styles', function() {
  gulp
  .src('app/css/style.css')
  .pipe(autoprefixer(config.autoprefix))
  .pipe(reload(config.reloadObj));
});




/* SCRIPT TASKS */
gulp.task('scripts', function() {
  gulp
  .src(config.scriptSrc)
  .pipe(reload(config.reload));
});




/* WATCH TASKS */
gulp.task('watch', function() {
  gulp.watch(config.watchScript, ['scripts']);
  gulp.watch(config.watchStyle , ['style'  ]);
  gulp.watch(config.watchHtml  , ['htmls'  ]);
})




/* BROWSERSYNC TASKS */
gulp.task('browser-sync', function() {
  browserSync(config.browserSync);
});



/* DEFAULT */
gulp.task('default', ['htmls', 'browser-sync', 'styles', 'watch']);