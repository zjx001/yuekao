const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

//编译sass

gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8080,
            livereload: true,
            proxies: [{
                source: '/api/getfind', //查找
                target: 'http://localhost:3000/api/getfind'
            }, {
                source: '/api/delfind', //删除
                target: 'http://localhost:3000/api/delfind'
            }, {
                source: '/api/addfind', //添加
                target: 'http://localhost:3000/api/addfind'
            }, {
                source: '/api/datafind', //修改
                target: 'http://localhost:3000/api/datafind'
            }]

        }))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))