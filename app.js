
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
  note = note.toUpperCase();
  return NOTES[note] * Math.pow(2, (tone||0));
}

function Sequence (note, tone, startTime) {
  this.note = getNote(note, tone);
  this.startTime = startTime * 1000;
}

function playSequence(sequenceList, osc) {
  sequenceList.forEach(sequence => {
    setTimeout(() => {
      osc.frequency.value = sequence.note;
      console.log(sequence);
    }, sequence.startTime);
  });
}

var ctx = new AudioContext(),
    dest = ctx.destination,
    timeCoef = 0.3,
    toneCoef = 3,
    MAX_TIME = 25000,
    time = 1,
    audioSequence = [
      new Sequence('C', toneCoef, time += timeCoef),
      new Sequence('D', toneCoef, time += timeCoef),
      new Sequence('E', toneCoef, time += timeCoef),
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
}, time * 1000);

osc1.start(1.5);
