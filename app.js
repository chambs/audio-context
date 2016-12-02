
var NOTES = {
  'C': 16.35,
  'C#': 17.32,
  'D': 18.35,
  'D#': 19.45,
  'E': 20.60,
  'F': 21.83,
  'F#': 23.12,
  'G': 24.50,
  'G#': 25.96,
  'A': 27.50,
  'A#': 29.14,
  'B': 30.87
};

function getNote (note, tone) {
  if (!NOTES.hasOwnProperty(note)) {
    return null;
  }
  note = note.toUpperCase();
  return NOTES[note] * Math.pow(2, (tone||0));
}

function Sequence (note, tone, startTime) {
  this.note = getNote(note, tone);
  this.startTime = startTime * 1000;
  if (!this.note) {
    this.isSilence = true;
  }
}

function Seq (strSequence) {
  var args = strSequence.split(':');
  Sequence.apply(this, args);
}

function playSequence(sequenceList, osc) {
  sequenceList.forEach(sequence => {
    setTimeout(() => {
      if (sequence.isSilence) {
        console.log('PAUSE.');
        osc.context.suspend();
        return;
      }
      osc.context.resume();
      osc.frequency.value = sequence.note;
      console.log(sequence);
    }, sequence.startTime);
  });
}

var ctx = new AudioContext(),
    dest = ctx.destination,
    timeCoef = 0.3,
    timeCoefPause = 0.2,
    toneCoef = 3,
    MAX_TIME = 25000,
    time = 1,
    audioSequence = [
      // easier, maybe? -> 'C:3:1.3'
      new Seq('C:' + toneCoef + ':' + (time += timeCoef)),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('E', toneCoef, time += timeCoef),
      // new Sequence('VOID', null, time += timeCoefPause),
      new Sequence('F', toneCoef, time += timeCoef),
      new Sequence('F', toneCoef, time += timeCoef),
      new Sequence('F', toneCoef, time += timeCoef),
      new Sequence('C', toneCoef, time += timeCoef),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('C', toneCoef, time += timeCoef),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('C', toneCoef, time += timeCoef),
      new Sequence('G', toneCoef, time += timeCoef),
      new Sequence('F', toneCoef, time += timeCoef),
      new Sequence('E', toneCoef, time += timeCoef),
      new Sequence('E', toneCoef, time += timeCoef),
      new Sequence('E', toneCoef, time += timeCoef),
      new Sequence('C', toneCoef, time += timeCoef),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('E', toneCoef, time += timeCoef),
      new Sequence('F', toneCoef, time += timeCoef),
      new Sequence('F', toneCoef, time += timeCoef),
      new Sequence('F', toneCoef, time += timeCoef)
    ];

var osc1 = ctx.createOscillator();
osc1.type = 'sawtooth';
osc1.connect(dest);

playSequence(audioSequence, osc1);

setTimeout(() => {
  ctx.suspend();
}, (time + 1) * 1000);

osc1.start(1.5);
