'use strict';

const { watch, series, parallel, src, dest } = require('gulp');

const browsersync = require('browser-sync').create();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

const scss = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');

const path = {
    build: {
        html: './build/',
        js: './build/js/',
        css: './build/css/',
    },
    src: {
        html: './src/**/*.html',
        ts: './src/ts/*.ts',
        scss: './src/scss/*.scss',
    },
    watch: {
        html: './src/**/*.html',
        ts: './src/ts/*.ts',
        scss: './src/scss/*.scss',
    },
    clean: './build',
};
let build = null;
let observe = null;

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build/',
        },
        port: 3000,
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
        .pipe(
            scss({
                outputStyle: 'compressed',
            }),
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function typescript() {
    return src(path.src.ts)
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
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

exports.build = build;
exports.observe = observe;

exports.default = observe;
