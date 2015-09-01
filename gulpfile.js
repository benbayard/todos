var gulp    = require('gulp');
var babel   = require('babel/register');
var mocha   = require('gulp-mocha');
var concat  = require('gulp-concat');
var watch   = require('gulp-watch');
var plumber = require('gulp-plumber');
var eslint  = require('gulp-eslint');

var testGlob  = '**/*-test.jsx';
var filesGlob = ['**/*.jsx', testGlob];
var notTests  = ['**/*.jsx', '!' + testGlob];

var lint = function() {
  gulp.src('**/*.jsx')
    .pipe(eslint())
    .pipe(eslint.formatEach('stylish', process.stdout));
}

var test = function() {
  gulp.src(testGlob)
    .pipe(plumber())
    .pipe(mocha({
      compiler: babel
    }));
}

gulp.task('watch', function() {
  watch(filesGlob, function() {
    lint();
    test();
  });
});

gulp.task('lint', function() {
  lint();
});
