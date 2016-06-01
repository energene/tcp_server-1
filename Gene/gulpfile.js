var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('mocha', () => {
  return gulp.src(['test/*.js'])
  .pipe(mocha());
});

var files = ['lib/**/*.js', 'test/**/*.js', 'gulpfile.js'];

gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('default', ['lint', 'mocha']);
