var gulp = require('gulp');
var server = require('gulp-express');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var Server = require('karma').Server;
var karma = require("gulp-karma-runner");
var gls = require('gulp-live-server');
//var livereload = require('gulp-livereload');


var tinylr;

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});


gulp.task('express', function() {
  var express = require('express');
  var app = express();
  //app.use(require('connect-livereload')());
  app.use(express.static(__dirname+'/client'));
  app.use(express.static('client/public'));
  app.listen(3000, '0.0.0.0');
});

gulp.task('servergo', function() {
  var mineserver = require('./server/bin/www');
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  console.log('notifyLiveReload >> fileName : ' + fileName)
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('concat-scripts', function() {
  return gulp.src('client/app/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('client/public/js'));
});

gulp.task('sass', function() {
    return sass('sass/*.scss', { indentedSyntax: false })
        .pipe(gulp.dest('client/public/css'))
})

gulp.task('styles', function() {
  gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('scripts', function() {
  gulp.watch('client/app/*.js', ['concat-scripts']);
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {

  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();

});


gulp.task('watch', function() {
  gulp.watch('client/views/*.html', notifyLiveReload);
  gulp.watch('views/*.html', notifyLiveReload);
  gulp.watch('client/public/css/*.css', notifyLiveReload);
  gulp.watch('client/public/js/*.js', notifyLiveReload);
});


gulp.task('default', ['servergo','livereload','styles','scripts','tdd','watch'], function() {

});
/*
gulp.task('default', ['livereload','styles','scripts','tdd','watch'], function() {

});
*/
/*
gulp.task('default', ['server'], function() {
});
*/