const { src, dest, watch, series, parallel } = require('gulp');
const browsersync = require('browser-sync').create();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
const scss = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const { path, file, outputStyle, port } = require('./src/ts/constants.ts');

let build = null;
let observe = null;

function browserSync() {
    browsersync.init({
        server: {
            baseDir: path.build.html,
        },
        port,
        notify: false,
        open: false,
    });
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function styles() {
    return src(path.src.scss)
        .pipe(concat(file.name.styles))
        .pipe(
            scss({
                outputStyle,
            }),
        )
        .pipe(rename({ suffix: file.suffix }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function typescript() {
    return src(path.src.ts)
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(rename({ suffix: file.suffix }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.scss], styles);
    watch([path.watch.ts], typescript);
}

function clean() {
    return del(path.clean);
}

build = series(clean, html, styles, typescript);
observe = parallel(build, watchFiles, browserSync);

exports.default = observe;
