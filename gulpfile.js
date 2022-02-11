const gulp = require("gulp");
const browserSync = require("browser-sync");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "src",
    },
  });
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(
      rename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.parallel("styles"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
