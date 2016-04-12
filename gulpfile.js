var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('default', ['watch']);

gulp.task('less', function() {
	return gulp
				.src(['src/client/main/modules/**/*.less', 'src/client/auth/modules/*.less'])
				.pipe(less())
				.pipe(gulp.dest('src/client/main/build'));
});

gulp.task('watch', function() {
	gulp.watch('src/client/main/modules/**/*.less', ['less']);
	gulp.watch('src/client/auth/modules/*.less', ['less']);
});
