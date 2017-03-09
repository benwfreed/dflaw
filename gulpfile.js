var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

var source = [
  'css/**/*.css',
  'js/**/*.js',
  'index.html'
];

gulp.task('serve', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('buildJs', function() {
  gulp.src(['app/js/main.js', 'app/js/controllers.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('buildElse', function() {
  gulp.src(['app/**/*', '!app/js/main.js', '!app/js/controllers.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('cleanDist', function(done) {
  del('dist');
  done;
});
