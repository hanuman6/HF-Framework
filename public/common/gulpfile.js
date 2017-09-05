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
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/**************************************************
 * path
 *************************************************/
var paths = {
  'source': '',
  'scss': 'sass/',
  'img': 'img/',
  'commonJs': 'js/common.js',
  'distJs': 'js/',
  'distImg': '_img/',
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
    gulp.watch([paths.img + '**/*.img'], reload);
    gulp.watch([paths.distJs + '**/*.js'], reload);
});
/**************************************************
 * option tasks
 *************************************************/
 /*
imagemin 画像の圧縮
*/
gulp.task('img', function () {
  var srcGlob = paths.img + '/**/*.+(jpg|jpeg|png|gif|svg)';
  var dstGlob = paths.distImg;
  var imageminOptions = {
    optimizationLevel: 7
  };
  gulp.src(img)
    .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false
    }],
    use: [pngquant()]
  }))
    .pipe(gulp.dest(distImg));
});
/*
JSを圧縮して*min.jsとして出力
*/
gulp.task('js', function(){
  return gulp.src(paths.commonJs)
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(paths.distJs));
});
/**************************************************
 * Run Task
 *************************************************/
//開発版
gulp.task('complie', function() {
  gulp.watch([paths.scss + '**/*.scss'], ['scss']);
});
//ライブリロード
gulp.task('reload', function() {
  gulp.watch(['scss', 'browser-sync', 'reload']);
});
//デフォルト
gulp.task('default', ['complie']);
