var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rubysass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(['scss/**/*.scss'])
        .pipe(sass({style:'expanded'}))
        .pipe(autoprefixer('last 2 version'))
        //.pipe(rename({suffix:'.min'}))
        //.pipe(minifycss())
        .pipe(gulp.dest(''));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(''));
});

// Watch Files For Changes
gulp.task('watch', function() {
    //livereload.listen();
    gulp.watch('js/*.js', ['lint', 'scripts']).on('change', livereload.changed);
    gulp.watch(['scss/**/*.scss' ], ['sass']).on('change', livereload.changed);
    gulp.watch(['*.php']).on('change', livereload.changed);
    // gulp.watch('**/*.scss', ['sass']).on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['sass', 'watch']);