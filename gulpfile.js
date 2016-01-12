var gulp = require("gulp");
var babel = require("gulp-babel");
var bower = require('main-bower-files');
var concat = require("gulp-concat");
var filter = require("gulp-filter");
var traceur = require("gulp-traceur");


gulp.task('babel', function(){
	gulp.src('./es6/*.es6')
		.pipe( babel( {
			presets: ['es2015']
		}) )
		.pipe( gulp.dest('./js') )
});

gulp.task('watch', function(){
	gulp.watch('./*.es6', ['babel'])
});

gulp.task("bower", function(){
	var js_filter = filter("*.js");
	gulp.src( bower() )
		.pipe( js_filter )
		.pipe( concat('lib.js') )
		.pipe( gulp.dest('js/lib') )
});

gulp.task("traceur", function(){
	gulp.src('./es6/*.es6')
		.pipe( traceur() )
		.pipe( gulp.dest('./js') )
});
	

gulp.task('default', ['babel']);


