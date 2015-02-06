'use strict';
var gulp = require('gulp'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),// Компиляция SASS
    //livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    wiredep = require('wiredep').stream,
    jade = require('gulp-jade'); // Компиляция Jade
    //plugins = require('gulp-load-plugins')();

//local server config
gulp.task('connect', function () {
    connect.server({
        root: ['app'],
        livereload: true
    });
    opn('http://localhost:8080/');//  открывает браузер
});

//css
gulp.task('css', function () {
    gulp.src('src/assets/styles/main.css')
        .pipe(rename('style.css'))
        .pipe(gulp.dest('built/css/'))
        .pipe(notify("Css ready!"))
        .pipe(connect.reload());
});

//Собираем Jade
gulp.task('jade', function () {
    gulp.src(['app/jade/*.jade', '!app/jade/_*.jade']) //Указываем какие файлы нужны
        .pipe(jade({   								//Вызываем Jade
            pretty: true 								// Делаем красиво и богато, пока что.
        }))
        .pipe(gulp.dest('./app/')) 					// Директория куда скидываются готовые файлы
        .pipe(notify("Jade ready!"))
        .pipe(connect.reload()); 						// Сервер перезапускаем
});

//Собираем SASS
gulp.task('sass', function () {
    return sass('app/sass/', {style: 'compressed', trace: true})  //Стиль Минифицированый. Трейс нужен для дебага
        .on('error', function (err) {								// Показывать где ошибка и идти дальше
            console.error('Error!', err.message); 					// Показывать где ошибка и идти дальше
        })
        // .pipe(minifyCSS())
        //.pipe(autoprefixer({
        //       browsers: ['last 5 versions'],
        //      cascade: true
        // }))
        .pipe(gulp.dest('app/css/'))								// Директория куда скидываются готовые файлы
        .pipe(notify("Scss Complete!"))
        .pipe(connect.reload());								    // Сервер перезапускаем

});

//html
gulp.task('html', function () {
    gulp.src('app/index.html')
        .pipe(notify("Html Complete!"))
        .pipe(connect.reload());
});
//Js
gulp.task('js', function () {
    gulp.src('./app/js/*.js')
        .pipe(notify("Js Complete!"))
        .pipe(connect.reload());
});
//wiredep
gulp.task('wiredep', function () {
    gulp.src('app/*html')
        .pipe(wiredep({
            directory: 'app/components'
        }))
        .pipe(gulp.dest('app'));
})
//watcher
gulp.task('watch', function () {
    gulp.watch('app/css/style.css', ['css']);
    gulp.watch('app/js/*.js', ['js']);
    gulp.watch('app/jade/*.jade', ['jade']);
    gulp.watch('app/sass/**/_*.scss', ['sass']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest('built/img/'));
});

//default
gulp.task('default', ['connect', 'watch']);