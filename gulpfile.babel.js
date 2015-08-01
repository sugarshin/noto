import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';
import { reload } from 'browser-sync';

import { D } from './gulp/conf';

requireDir('./gulp/tasks');

gulp.task('predefault', cb => {
  runSequence(
    ['jade', 'stylus', 'watchify'],
    'serve',
    cb
  );
});

gulp.task('default', ['predefault'], () => {
  gulp.watch(
    [`./${D.SRC}/**/*.jade`],
    ['jade', reload]
  );
  gulp.watch(
    [`./${D.SRC}/**/*.styl`],
    ['stylus', reload]
  );
  gulp.watch(
    [`./${D.DEST}/**/*.js`],
    reload
  );
});

gulp.task('build:html', cb => {
  runSequence('jade', 'replace', cb);
});

gulp.task('build:css', cb => {
  runSequence('stylus', 'minify-css', cb);
});

gulp.task('build:js', cb => {
  runSequence('browserify', 'uglify', cb);
});

gulp.task('build', ['clean'], cb => {
  runSequence(
    ['build:html', 'build:css', 'build:js'],
    cb
  );
});
