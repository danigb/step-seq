'use strict'

var curry = require('curry')

module.exports = curry(sequence)

function sequence (ctx, player, tempo, data) {
  var tickInterval = 60 / tempo
  var nextTick = ctx.currentTime + 0.1
  var tick = 0
  var array = Array.isArray(data) ? data : null
  var max = array ? array.length : (data || 10)
  var timer = null

  function stop () { clearInterval(timer) }

  timer = setInterval(function () {
    var current = ctx.currentTime
    var ahead = current + tickInterval
    if (nextTick < ahead) {
      player(array ? array[tick] : tick, nextTick, tickInterval)
      tick++
      nextTick += tickInterval
    }
    if (tick >= max) stop()
  }, tickInterval * 0.6)

  return stop
}
