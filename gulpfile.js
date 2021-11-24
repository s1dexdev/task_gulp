const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
