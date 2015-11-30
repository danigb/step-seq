# Step sequencer  

A tiny web audio step sequencer:

```js
var freq = require('note.freq')

var ctx = new AudioContext()
var sequencer = require('step-seq')(ctx)

var sequence = sequencer(function (note, time, duration) {
  var osc = ctx.createOscillator()
  osc.frequency.value = freq(note)
  osc.start(time)
  osc.stop(time + 0.8 * duration)
})

sequence(100, ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']).start()
```
## API

Only one function:

#### sequencer(ctx, player, tempo, data)

Create a sequence.


## Examples

To run the example `npm install -g beefy` then `beefy examples/piano.js` and navigate to http://localhost:9966/

## License

MIT License
