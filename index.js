'use strict'

var curry = require('curry')

module.exports = curry(sequence)

function sequence (ctx, player, tempo, data) {
  var tickInterval = 60 / tempo
  var nextTick = ctx.currentTime + 0.1
  var tick = 0
  console.log(tickInterval)

  setInterval(function () {
    var current = ctx.currentTime
    var ahead = current + tickInterval
    if (nextTick < ahead) {
      tick++
      nextTick += tickInterval
      player(tick, nextTick, tickInterval)
    }
  }, tickInterval * 0.6)
}
