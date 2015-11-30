var ctx = new window.AudioContext()
var sequencer = require('..')(ctx)
var soundfont = require('soundfont-player')(ctx)

var piano = soundfont.instrument('acoustic_grand_piano')
var sequence = sequencer(function (note, time, duration) {
  piano.play(note, time)
})

piano.onready(function () {
  sequence(120, 'c3 d3 e3 f3 g3 a3 b3 c4'.split(' ')).start()
})
