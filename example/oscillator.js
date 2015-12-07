/* global AudioContext */

console.log('Step sequence example')
var sequencer = require('../')

var ctx = new AudioContext()
var sequence = sequencer(ctx, function (event, data, time, duration) {
  console.log('Event', event, data, time, duration)
  if (event !== 'data') return
  var osc = ctx.createOscillator()
  osc.connect(ctx.destination)
  osc.frequency.value = data
  osc.start(time)
  osc.stop(time + 0.8 * duration)
})

// run a sequence
sequence([261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]).start()
