var gulp = require("gulp"); // # 1) Chargement du "task automater"
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');



gulp.task('browser-sync', ['sass'],() => {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("styles/sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', reload);
    gulp.watch("JS/*.js").on('change', reload);
});

gulp.task('sass', () => {
    return gulp.src('./styles/sass/*.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(gulp.dest('./styles/css'))
               .pipe(browserSync.stream())
});

gulp.task('default', ['browser-sync']);