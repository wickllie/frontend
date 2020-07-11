const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const paths = {
  root: './public',
  src: './source',
  fonts: {
    src: './source/assets/fonts/**/*',
    dist: './public/assets/fonts'
  },
  images: {
    src: './source/assets/images/**/*',
    dist: './public/assets/images'
  },
  scripts: {
    src: './source/assets/scripts/**/*.js',
    dist: './public/assets/scripts'
  },
  static: {
    src: './source/assets/static/**/*',
    dist: './public/assets/static'
  },
  styles: {
    css: './source/assets/styles/css/**/*.css',
    sass: './source/assets/styles/sass/**/*.sass',
    dist: './public/assets/styles'
  },
  views: {
    src: './source/views/index.html',
    dist: './public'
  }
};

function browserSyncSet() {
  browserSync.init({
    server: { baseDir: paths.root},
    notify: false
  });
  browserSync.watch(paths.src + '/**/*', browserSync.reload)
};

function css() {
  return src(paths.styles.css)
  .pipe(cleanCSS(({ level: { 1: { specialComments: 0 } } })))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(paths.styles.dist))
}

function delSet() {
  return del(paths.root + '/**/*')
};

function fonts() {
  return src(paths.fonts.src)
  .pipe(dest(paths.fonts.dist))
};

function images() {
  return src(paths.images.src)
  .pipe(imagemin())
  .pipe(dest(paths.images.dist))
};

function scripts() {
  return src(paths.scripts.src)
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(paths.scripts.dist))
};

function static() {
  return src(paths.static.src)
  .pipe(dest(paths.static.dist))
};

function styles() {
  return src(paths.styles.sass)
  .pipe(sass())
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleanCSS(({ level: { 1: { specialComments: 0 } } })))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(paths.styles.dist))
};

function views() {
  return src(paths.views.src)
  .pipe(htmlmin({ collapseWhitespace: true, html5: true }))
  .pipe(dest(paths.views.dist))
};

function watchSet() {
  watch(paths.styles.css, css)
  watch(paths.fonts.src, fonts)
  watch(paths.images.src, images)
  watch(paths.scripts.src, scripts)
  watch(paths.static.src, static)
  watch(paths.styles.sass, styles)
  watch(paths.views.src, views)
};

exports.build = series(delSet, parallel(css, fonts, images, scripts, static, styles, views))
exports.default = parallel(browserSyncSet, watchSet)
