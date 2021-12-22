const { src, dest, parallel, series, watch } = require('gulp')

const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const pump = require('pump')

const JS = () => pump(src('src/index.js'), uglify(), dest('dist'))

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

  watch('index.html', browserSync.reload)
  watch('src/index.js', series(JS, browserSync.reload))
  watch('src/styles.sass', SASS)
}

exports.dev = series(parallel(JS, SASS), SERVER)
