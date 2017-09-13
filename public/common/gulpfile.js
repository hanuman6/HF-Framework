/**************************************************
 * Gulpfile v.1.0
 *************************************************/
/* Getting Start!
install => npm install (yarn)
update check => npm-check-updates -u
update => npm update
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnext = require('gulp-cssnext');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg  = require('imagemin-mozjpeg');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/**************************************************
 * path
 *************************************************/
var paths = {
  'scss': 'sass/',
  'img': 'low_img/',
  'commonJs': 'js/common.js',
  'distJs': 'js/',
  'distImg': 'img/',
  'css': 'css/'
}

/**************************************************
 * Task
 *************************************************/
/*
SCSSをコンパイル
*/
gulp.task('scss', function() {
  return gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(cssnext({
        browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest(paths.css));
});
/*
ブラウザー同期
*/
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: '192.168.33.11'
  });
});
gulp.task("reload", function () {
    gulp.watch([paths.scss + '**/*.scss'], reload);
    gulp.watch([paths.distJs + '**/*.js'], reload);
});
/**************************************************
 * option tasks
 *************************************************/
 /*
imagemin 画像の圧縮
*/
gulp.task('img', function () {
  return gulp.src(paths.img + '/*')
	.pipe(imagemin([
		pngquant({ quality: '75-85', speed: 1 }),
		mozjpeg({ quality: 85 }),
		imagemin.svgo(),
		imagemin.gifsicle()
	]))
	.pipe(gulp.dest(paths.distImg))
});
/**************************************************
 * Run Task
 *************************************************/
//CSS生成
gulp.task('css', function() {
  gulp.watch([paths.scss + '**/*.scss'], ['scss']);
});
//デフォルト
gulp.task('default', ['scss', 'css', 'browser-sync', 'reload']);
