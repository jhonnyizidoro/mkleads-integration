const { src, dest, parallel, series, watch } = require('gulp')

const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const pump = require('pump')

const JS = () => pump(src('src/index.js'), uglify(), dest('dist'))

const NORMALIZE = () => pump(src('src/default.css'), dest('dist'))

const SASS = () =>
  pump(
    src('src/styles.sass'),
    sass({ outputStyle: 'compressed' }),
    dest('dist'),
    browserSync.stream()
  )

const SERVER = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })

  watch('index.html', RELOAD)
  watch('src/index.js', series(JS, RELOAD))
  watch('src/styles.sass', SASS)
}

const RELOAD = callback => {
  browserSync.reload()
  callback()
}

exports.dev = series(parallel(JS, SASS, NORMALIZE), SERVER)
