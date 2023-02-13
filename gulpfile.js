const gulp = require("gulp");
const browserSync = require("browser-sync");
const scss = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const fileInclude = require("gulp-file-include");

// Static server
gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("src/**/*.html").on("change", browserSync.reload);
  gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
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
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(fileInclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task("icons", function () {
  return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));
});

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.parallel("styles"));
  gulp.watch("src/**/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/js/**/*.js", gulp.parallel("scripts"));
  gulp.watch("src/img/**/*", gulp.parallel("images"));
  gulp.watch("src/icons/**/*", gulp.parallel("icons"));
  gulp.watch("src/fonts/**/*", gulp.parallel("fonts"));
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "html",
    "scripts",
    "fonts",
    "images",
    "icons"
  )
);
