import gulp from 'gulp';

import { copy as conf } from '../conf';

gulp.task('copy:zeroclipboard', () => {
  return gulp.src(conf.zeroclipboard.src)
    .pipe(gulp.dest(conf.zeroclipboard.dest));
});
