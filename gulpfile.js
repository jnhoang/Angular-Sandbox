var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

var reloadObj = { stream: true };

gulp.task('html', function() {
  gulp
  .src(['index.html', 'app/components/**/*.html'])
  .pipe(reload(reloadObj));
});

gulp.task('scripts', function() {
  gulp
  .src(['gulpfile.js', 'app/js/**/*.js', 'app/components/**/*.js' ,'!app/js/**/*.min.js'])
  .pipe(reload(reloadObj));
});

/* WATCH TASKS */
gulp.task('watch', function() {
  var scriptWatchArr = [
    'gulpfile.js', 
    'app/js/**/*.js',
    'app/components/**/*.js'
  ];
  gulp.watch(scriptWatchArr, ['scripts']);
  gulp.watch('app/components/**/*.html', ['html']);
})

/* BROWSERSYNC TASKS */
gulp.task('browser-sync', function() {
  browserSyncObj = {
    server: {
      baseDir: './app/'
    }
  };

  browserSync(browserSyncObj);
});


gulp.task('default', ['html', 'browser-sync', 'watch']);