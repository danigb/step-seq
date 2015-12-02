var ctx = new window.AudioContext()
var soundfont = require('soundfont-player')(ctx)
var sequencer = require('../')

console.log('loading piano')

soundfont.instrument('acoustic_grand_piano').onready(function (piano) {
  console.log('ready', piano)
  var sequence = sequencer(ctx, function (event, note, time, duration) {
    var midi = 21 + note % 88
    if (event === 'data') piano.play(midi, time)
  })
  sequence.tempo(60).start()
})
