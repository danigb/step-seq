var sequencer = require('.')
var freq = require('tonal.note/freq')(440)
var ADSR = require('adsr')

/**
 *
 * @param {AudioContext} ctx
 * @param {Float} attack - the attack in seconds
 * @param {Float} decay - the decay in seconds
 * @param {Float} sustain - the sustain gain value
 * @param {Float} release - the release in seconds
 */
function adsr (ctx, attack, decay, sustain, release) {
  var adsr = ADSR(ctx)
  adsr.connect(gain)
  adsr.attack = attack
  adsr.decay = decay
  adsr.sustain = sustain
  adsr.release = release
  return adsr
}

var ctx = new window.AudioContext()
var gain = ctx.createGain()
gain.connect(ctx.destination)

var seq = sequencer(ctx, function (note, time, duration) {
  console.log('play', note, freq(note), time, duration)
  var osc = ctx.createOscillator()
  osc.type = 'square'
  osc.frequency.value = freq(note)
  osc.connect(gain)

  var env = adsr(ctx, 0.05, 0.2, 0.1, 0.4)
  gain.gain.value = 0
  env.connect(gain.gain)

  osc.start(time)
  env.start(time)
  osc.stop(env.stop(time + 0.5 * duration))
})

seq(120, ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
