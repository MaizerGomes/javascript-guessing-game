'use strict'
var gulp = require('gulp')
const uuidv4 = require('uuid/v4')

gulp.task('generate-service-worker', function (callback) {
  var path = require('path')
  var swPrecache = require('sw-precache')
  var rootDir = 'dist'

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    'staticFileGlobs': [rootDir + '/**/*.{html,css,png,ico,js,map,ogg,mp3}'],
    'stripPrefix': rootDir
  }, callback)
})

gulp.task('rename-images', function (callback) {
  var fs = require('fs')
  var logos = JSON.parse(fs.readFileSync('./static/data/js.json'))
  logos.forEach((logo) => {
    const uuid = uuidv4()
    fs.renameSync('./dist/static/logos/js/' + logo.name.toLowerCase() + '.png', './dist/static/logos/js/' + uuid + '.png')
    logo.uuid = uuid
  })
  fs.writeFileSync('./dist/static/data/js.json', JSON.stringify(logos, null, 2))

  var musicians = JSON.parse(fs.readFileSync('./static/data/musicians.json'))
  musicians.forEach((musician) => {
    const uuid = uuidv4()
    fs.renameSync('./dist/static/logos/musicians/' + musician.name.toLowerCase() + '.png', './dist/static/logos/musicians/' + uuid + '.png')
    musician.uuid = uuid
  })
  fs.writeFileSync('./dist/static/data/musicians.json', JSON.stringify(musicians, null, 2))

  var presidents = JSON.parse(fs.readFileSync('./static/data/presidents.json'))
  presidents.forEach((president) => {
    const uuid = uuidv4()
    fs.renameSync('./dist/static/logos/presidents/' + president.name.toLowerCase() + '.png', './dist/static/logos/presidents/' + uuid + '.png')
    president.uuid = uuid
  })
  fs.writeFileSync('./dist/static/data/presidents.json', JSON.stringify(presidents, null, 2))

  var flags = JSON.parse(fs.readFileSync('./static/data/flags.json'))
  flags.forEach((flag) => {
    const uuid = uuidv4()
    fs.renameSync('./dist/static/logos/flags/' + flag.name.toLowerCase() + '.png', './dist/static/logos/flags/' + uuid + '.png')
    flag.uuid = uuid
  })
  fs.writeFileSync('./dist/static/data/flags.json', JSON.stringify(flags, null, 2))
  callback()
})
