var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
  .pipe(mocha({ reporter: 'list' }));
});

gulp.task('watch-mocha', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

var files = ['**', '**/*'];

gulp.task('lint', function() {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('default', ['lint', 'watch-mocha']);
