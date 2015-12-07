'use strict'

/**
 * Create a sequence
 *
 * A sequence is an object with two methods: start and stop
 *
 * @param {AudioContext} ctx - the audio context
 * @param {Function} player - the function that plays the song
 * @param {Integer} tempo - the tempo
 * @param {Array|Integer} data - the data source
 */
function sequencer (ctx, callback) {
  var timer, iterable, iterator, nextTick, tempo, tickInterval, lookahead

  function emit (event, data, time, duration) {
    setTimeout(function () { callback(event, data, time, duration) }, 0)
  }

  function sequence (data) {
    if (!data) iterator = rangeIterator(0, Infinity)
    else if (typeof data === 'function') iterator = data
    else if (Math.floor(data) === data) iterator = rangeIterator(0, data)
    else if (typeof data === 'string') iterator = arrayIterator(data.split(' '))
    else if (Array.isArray(data)) iterator = arrayIterator(data)
    else iterator = arrayIterator([ data ])
    return sequence
  }

  sequence.tempo = function (newTempo) {
    if (arguments.length === 0) return tempo
    tempo = newTempo
    tickInterval = 60 / tempo
    lookahead = tickInterval * 0.1
    return sequence
  }

  sequence.start = function () {
    if (!timer) {
      iterable = iterator()
      nextTick = ctx.currentTime + lookahead
      emit('start', null, nextTick)
      timer = setInterval(schedule, lookahead)
    }
    return sequence
  }

  sequence.stop = function () {
    if (timer) {
      clearInterval(timer)
      timer = null
      emit('stop')
    }
    return sequence
  }

  function schedule () {
    var current = ctx.currentTime
    var ahead = current + lookahead
    if (nextTick >= current && nextTick < ahead) {
      var n = iterable.next()
      if (n.done) {
        sequence.stop()
      } else {
        callback('data', n.value, nextTick, tickInterval)
      }
      nextTick += tickInterval
    }
  }

  return sequence().tempo(120)
}

function rangeIterator (min, max) {
  return function () {
    var v = min - 1
    return { next: function () {
      v++
      return { value: v, done: min >= max }
    } }
  }
}

function arrayIterator (arr) {
  return function () {
    var len = arr.length
    var index = -1
    return { next: function () {
      index++
      return { value: arr[index], done: index >= len }
    } }
  }
}

if (typeof module === 'object' && module.exports) module.exports = sequencer
if (typeof window !== 'undefined') window.sequencer = sequencer
