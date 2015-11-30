# Step sequencer  

A tiny web audio step sequencer:

```js
var freq = require('note.freq')

var ctx = new AudioContext()
var sequencer = require('step-seq')

sequencer = sequencer(ctx, function (note, time, duration) {
  var osc = ctx.createOscillator();
  osc.frequency.value = freq(note)
  osc.start(time)
  osc.stop(time + 0.8 * duration)
})

sequencer(100, ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
```

## Example

To run the example `npm install -g beefy` then `beefy example.js` and navigate to http://localhost:9966/

## License

MIT License
