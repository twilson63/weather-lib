const test = require('tape')

const { findWeather } = require('../')

test('find weather for charleston', t => {
  findWeather('Charleston').then(info => {
    t.equals(info.title, 'Charleston')
    t.end()
  })
})
