'use strict'

var curry = require('curry')

/**
 * Create a sequence
 *
 * A sequence is an object with two methods: start and stop
 *
 * @param {AudioContext} ctx - the audio context
 * @param {Function} player - the function that plays the song
 * @param {Integer} tempo - the tempo
 * @param {Array|Integer} data - the data
 */
function sequencer (ctx, player, tempo, data) {
  var timer, nextTick, tick
  var tickInterval = 60 / tempo
  var array = Array.isArray(data) ? data : null
  var max = array ? array.length : (data || 10)

  var seq = { tempo: tempo, data: data }

  function schedule () {
    var ahead = ctx.currentTime + tickInterval
    if (nextTick < ahead) {
      player(array ? array[tick] : tick, nextTick, tickInterval)
      tick++
      nextTick += tickInterval
    }
    if (tick >= max) seq.stop()
  }

  seq.stop = function () {
    clearInterval(timer)
    return seq
  }
  seq.start = function () {
    tick = 0
    nextTick = ctx.currentTime + 0.1
    timer = setInterval(schedule, tickInterval * 0.6)
    return seq
  }
  return seq
}

if (typeof module === 'object' && module.exports) module.exports = curry(sequencer)
if (typeof window !== 'undefined') window.sequencer = curry(sequencer)
