const { src, dest, parallel, series, watch } = require('gulp')
const { rmdirSync, existsSync } = require('fs')

const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const pump = require('pump')

const CLEAN = callback => {
  if (existsSync('dist')) {
    rmdirSync('dist', { recursive: true })
  }
  callback()
}

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

  watch('index.html', RELOAD)
  watch('src/index.js', series(JS, RELOAD))
  watch('src/styles.sass', SASS)
}

const RELOAD = callback => {
  browserSync.reload()
  callback()
}

exports.dev = series(CLEAN, parallel(JS, SASS), SERVER)
exports.build = series(CLEAN, parallel(JS, SASS))
