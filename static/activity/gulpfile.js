var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('main', function () {
    gulp.src(["js/headportraitlist.js", "js/suanfa.js", "js/stylerule.js", "js/earth.js", "js/screw.js", "js/merrygoround.js", "js/bambootube.js", "js/tile.js", "js/square.js", "js/logoanimition.js", "js/animationconfig.js", "js/temporary.js", "js/prizesAwards.js","js/messagewall.js", "js/toolbar.js", "js/main.js"])
        .pipe(babel())
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('js/dist'))
});
gulp.task('default', ['main'], function () {
    gulp.watch('js/*.js', ['main']);
});