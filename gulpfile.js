var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),

    jsPath = 'src/js/**/*.js',
    htmlPath = 'frontend/**/*.html',
    sassPath = 'src/sass/style.scss';


gulp.task('build:js', function(){
    gulp.src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('frontend/js/'))
        .pipe(livereload());
});

gulp.task('build:css', function(){
    gulp.src(sassPath)
        .pipe(sass({sourcemap: true, style: 'compact'}))
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(cssmin())
        .pipe(gulp.dest('frontend/css'))
        .pipe(livereload());
});

gulp.task('build:html', function(){
    gulp.src(htmlPath)
        .pipe(livereload());
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(jsPath, ['build:js']);
    gulp.watch(sassPath, ['build:css']);
    gulp.watch(htmlPath, ['build:html']);
});

gulp.task('server', function(){
    return nodemon({script: 'app.js', env:{'NODE_ENV': 'dev'}})
});


//just build the app for production
gulp.task('default', ['build:css', 'build:js']);

//run local server and develop
gulp.task('dev', ['build:css', 'build:js', 'server', 'watch']);