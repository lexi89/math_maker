var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var nodemon       = require("gulp-nodemon");
var sass          = require("gulp-sass");
var autoprefixer  = require("gulp-autoprefixer");

gulp.task("default", ["browser-sync"], function(){
}); // watches for changes in /app, calls nodemon to reboot node server, and compiles & autoprefixes sass,

gulp.task('browser-sync',["nodemon"], function() {
    browserSync.init({
        proxy: "http://localhost:5000",
        files: ["app/**/*.*"],
        port:3000,
        notify: false
    });
    gulp.watch("./app/assets/css/*.scss", ["sass"]);
    gulp.watch(["*.html", "*.js", "*.ejs"], browserSync.reload);
});

gulp.task("sass", function(){
  return gulp.src("./app/assets/css/main.scss")
  .pipe(sass({
    outputStyle: "compressed",
    includePaths: ['./app/assets/libs/bower/foundation-sites/scss']
  })
    .on("error", sass.logError)
  )
  .pipe(autoprefixer({
    browsers: ["last 2 versions"]
  }))
  .pipe(gulp.dest("./app/assets/css"))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task("nodemon", function(cb){
  var started = false;

  return nodemon({
    script: "server.js"
  }).on("start", function(){
    if (!started) {
      cb();
      started = true;
    }
  });
});
