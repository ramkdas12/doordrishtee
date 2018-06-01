const gulp = require('gulp');
const del = require('del');
// const typescript = require('gulp-typescript');
// const tscConfig = require('./tsconfig.json');
var exec = require('child_process').exec;
// const sourcemaps = require('gulp-sourcemaps');
// const tslint = require('gulp-tslint');
// var concat = require('concat-files');

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('buildJS', function (cb) {
    exec('ng build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('watchHtml', function(){
    return watch('src/**/*.html', function () {
        gulp.src('src/**/*')
            .pipe(gulp.dest(BUILD_DIR))
    })

})
gulp.task('watchJS', function(){
    return watch('src/**/*.js', 'devJS')
})

gulp.task('watchCSS', function(){
    return watch(['src/**/*.css', 'src/**/*.scss'], 'buildStyles')
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['buildJS']);
    gulp.watch(['src/**/*.css', 'src/**/*.scss'], ['buildJS']);
    gulp.watch('src/**/*.ts', ['buildJS']);
});

gulp.task('serve', function (cb) {
    exec('node server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('test', function (cb) {
    exec('ng test', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('default', ['watch']);

gulp.task('run-dev', ['clean', 'buildJS', 'watch', 'serve']);