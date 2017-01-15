import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import hbsfy from 'hbsfy';
// import connect from 'gulp-connect';
import source from 'vinyl-source-stream';
// import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import sass from 'gulp-sass';
// import rename from 'gulp-rename';

const INDEX_HTML = 'src/index.html';
const ENTRY_POINT = 'src/app.js';
const OUTPUT_DIR = './build';

gulp.task('init', () => console.log('Default task called'));

gulp.task('see', () => {
  console.log('changed');
});

gulp.task('copy', () => gulp.src(INDEX_HTML)
  .pipe(gulp.dest(OUTPUT_DIR)));

gulp.task('build', () => browserify(ENTRY_POINT)
  .transform(babelify)
  .transform(hbsfy)
  .bundle()
  .on('error', (err) => {
    console.error(err);
  })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulp.dest(OUTPUT_DIR)));

gulp.task('sass', () => {
  gulp.src('./assets/style/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['sass', 'copy', 'build']);

gulp.task('watch', () => {
  gulp.watch(INDEX_HTML, ['copy']);
  gulp.watch('./assets/style/*.sass', ['sass']);
  gulp.watch([
    'src/**/*.js',
    'src/components/**/*.hbs',
  ], ['build']);
});
