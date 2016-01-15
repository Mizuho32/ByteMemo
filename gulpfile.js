var gulp = require("gulp");
var babel = require("gulp-babel");
var bower = require('main-bower-files');
var concat = require("gulp-concat");
var filter = require("gulp-filter");
var traceur = require("gulp-traceur");
var rename = require("gulp-rename");
var less = require("gulp-less");
var minify = require("gulp-minify-css");


gulp.task('babel', function(){
	gulp.src('./es6/*.es6?(.js)')
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

gulp.task("bowercss", function(){
	var css_filter = filter("*.css", {restore: true});
	var less_filter = filter("*.less", {restore: true});
	var libdir = "css/raw"

	gulp.src(bower())
		.pipe( css_filter )
		.pipe( 
			rename({
				prefix: "_",
				extname:".css"
			})
		)
		.pipe( gulp.dest(libdir) )
		.pipe( css_filter.restore )
		.pipe( less_filter )
		.pipe( less() )
		.pipe( 
			rename({
				prefix: "_",
				extname: ".css"
			})
		)
		.pipe( gulp.dest(libdir) )
		.pipe( less_filter.restore );
});

gulp.task("cssmin", ["bowercss"], function(){
	var cssdir = "css/";
	var libdir = "css/raw/";

	gulp.src(libdir + "_*.css")
		.pipe( concat("_bundle.css") )
		.pipe( gulp.dest(cssdir) )
		.pipe( minify() )
		.pipe( 
			rename({
				extname: ".min.css"
			})
		)
		.pipe( gulp.dest(cssdir) );
});




gulp.task("traceur", function(){
	gulp.src('./es6/*.es6(.js)?')
		.pipe( traceur() )
		.pipe( gulp.dest('./js') )
});
	

gulp.task('default', ['babel']);


