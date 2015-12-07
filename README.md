# Step sequencer  [![npm](https://img.shields.io/npm/v/step-seq.svg)](https://www.npmjs.com/package/step-seq)

A tiny web audio step sequencer:

```js
var sequencer = require('step-seq')

var ctx = new AudioContext()
var sequence = sequencer(ctx, function (event, data, time, duration) {
  if (event !== 'data') return
  var osc = ctx.createOscillator()
  osc.connect(ctx.destination)
  osc.frequency.value = data
  osc.start(time)
  osc.stop(time + 0.8 * duration)
})

// run a sequence
sequence([261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]).start()
```

## Install

Via npm: `npm i --save step-seq` or use the browser based distribution (exports `sequencer` to the window globals)

## Usage

Its just one function:

#### `sequencer(ctx, scheduler)`

Create a sequencer with an scheduler:

```js
var sequence = sequencer(ctx, function (event, data, time, duration) {
  if (event === 'start') { ... }
  else if (event === 'stop') { ... }
  else if (event === 'data') {
    // play('something').at(time)
  }
})
```

The scheduler function receives the following parameters:

- event: the event type. Can be 'start', 'stop' or 'data'
- data: the data payload (depends on the sequence data)
- time: the time in the audio context reference
- duration: the duration in seconds of each beat

The returned sequence function has the following signature:

#### `sequence(source)`

It creates sequence objects. The source can be:

- An array: iterates over the array
- A number: iterates from 0 to n-1
- A string: split it using spaces and iterate its elements
- A function: a generator-type function
- Nothing: iterates from 0 to Infinity

```js
var s = sequence('A B C D')
s.tempo(100).start()
```

The sequence object has the following (chainable) methods:

- __`start(when)`__: starts the sequence when the audio context currentTime is `when`
- __`stop(when)`__: stops the sequence when audio context currentTime is greater than `when`
- __`tempo(newTempo)`__: set/get the sequence tempo

## Examples

To run the example `npm install -g beefy` and then `beefy example/oscillator.js`

## License

MIT License
