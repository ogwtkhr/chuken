var gulp = require('gulp');
var sass = require('gulp-sass');
var inlineImage = require('gulp-inline-image');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('sass', () => {
  gulp.src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(inlineImage())
//    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css'))
});

gulp.task('html', () => {
  gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./build/html'))
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('watch', () => {
  gulp.watch('./src/scss/*.scss', ['sass', 'reload']);
  gulp.watch('./src/html/*.html', ['html', 'reload']);
});

gulp.task('default', ['sass', 'html', 'browser-sync', 'watch']);
