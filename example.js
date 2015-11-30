var sequencer = require('.')

console.log('step-seq example')

var ctx = new window.AudioContext()

var seq = sequencer(ctx, function (note, time, duration) {
  console.log('Joder', note, time, duration)
})

seq(120, ['C2', 'D3', 'F5'])
