'use strict'

import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import connect from 'gulp-connect';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import sass from 'gulp-sass';
import rename from 'gulp-rename';

gulp.task('init', () => console.log('Default task called'));

gulp.task('see', () => {
    console.log('changed');
})

gulp.task('copy', () => {
    return gulp.src('./components/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('build', () => {
    var bundler = browserify('./models/script.js');
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(source('scr.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'));
        console.log('b');
});

gulp.task('sass', () => {
    gulp.src('./assets/style/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./build'))
})

gulp.task('default', ['sass', 'copy']);

gulp.task('watch', () => {
    gulp.watch('./components/index.html', ['copy']);
    gulp.watch('./assets/style/*.sass', ['sass']);
    gulp.watch('./models/*.js', ['build']);
})

//*******************experimental**********************

/*gulp.task('browserify', () => {
    return browserify('./assets/js/al.js')
        .bundle()
        .pipe(source('mod.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('browserify1', () => {
  var bundler = browserify('./assets/js/al.js');
  bundler.transform(babelify);
  bundler.bundle()
      .on('error', function(err) {
          console.error(err);
      })
      .pipe(source('mod2.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./build'));
});*/

//**********************same as build***************************

/*gulp.task("builder", () => {
    return browserify({
            entries: ["./assets/js/index.js"]
        })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build"));
});*/
