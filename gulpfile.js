const gulp = require('gulp');

// SCSS - CSS
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require ('gulp-autoprefixer');
const cssbeautify = require ('gulp-cssbeautify');
const removeComments = require ('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require ('gulp-cssnano');
const del = require('del');

// JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');

// SVG
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

// SCSS to CSS compilation and minification with cleaning 
gulp.task('sass-compile', function() {
    return gulp.src('./assets/dev/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        Browserslist: ['last 8 versions'],
        cascade: true
    }))
    .pipe(cssbeautify())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(cssnano({
        zindex: false,
        discardComments: {
            removeAll: true
        }
    }))
    .pipe(removeComments())
    .pipe(rename({
        suffix: ".min",
        extname: ".css"
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('clean', function(){
    return del('./assets/dev/scss/**/*.css');
});

// JS compilation and minification
gulp.task('js-minify', function() {
    return gulp.src('./assets/dev/js/**/*.js')
    .pipe(sourcemaps.init())
    // .pipe(concat('user-account.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js/'));
});

// SVG sprite 
gulp.task('svg-sprite-dev', function () {
	return gulp.src('./assets/dev/svg/**/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// dev svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../sprite.svg',
					render: {
						scss: {
							dest: '../../../dev/scss/inc/_sprite.scss',
							template: './assets/dev/scss/templates/_sprite_template.scss'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('./assets/images/svg/'));     
});

// Task for watching
gulp.task('watch', function() {
    gulp.watch('./assets/dev/scss/**/*.scss', gulp.series('sass-compile'));
    gulp.watch('./assets/dev/scss/**/*.css', gulp.series('clean'));
    gulp.watch('./assets/dev/js/**/*.js', gulp.series('js-minify'));
    gulp.watch('./assets/dev/svg/**/*.svg', gulp.series('svg-sprite-dev'));
});