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

const file = {
    name: {
        styles: 'styles.css',
    },
    suffix: '.min',
};

const outputStyle = 'compressed';
const port = 3000;

module.exports = { path, file, outputStyle, port };
