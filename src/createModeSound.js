function createNoise(ctx, gainValue, filterFreq) {

  const bufferSize =
    2 * ctx.sampleRate;

  const noiseBuffer =
    ctx.createBuffer(
      1,
      bufferSize,
      ctx.sampleRate
    );

  const output =
    noiseBuffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {

    output[i] =
      Math.random() * 2 - 1;

  }

  const whiteNoise =
    ctx.createBufferSource();

  whiteNoise.buffer =
    noiseBuffer;

  whiteNoise.loop = true;

  const filter =
    ctx.createBiquadFilter();

  filter.type = "lowpass";

  filter.frequency.value =
    filterFreq;

  const gain = ctx.createGain();

  gain.gain.value =
    gainValue;

  whiteNoise.connect(filter);

  filter.connect(gain);

  return {
    source: whiteNoise,
    output: gain,
  };

}

function rain(ctx, master) {

  const noise =
    createNoise(ctx, 0.018, 1200);

  noise.output.connect(master);

  noise.source.start();

}

function snow(ctx, master) {

  const noise =
    createNoise(ctx, 0.008, 500);

  noise.output.connect(master);

  noise.source.start();

}

function factory(ctx, master) {

  const osc =
    ctx.createOscillator();

  osc.type = "sine";

  osc.frequency.value = 58;

  const gain = ctx.createGain();

  gain.gain.value = 0.012;

  osc.connect(gain);

  gain.connect(master);

  osc.start();

}

function train(ctx, master) {

  const osc =
    ctx.createOscillator();

  osc.type = "triangle";

  osc.frequency.value = 90;

  const gain = ctx.createGain();

  gain.gain.value = 0.01;

  osc.connect(gain);

  gain.connect(master);

  osc.start();

}

function takibi(ctx, master) {

  const noise =
    createNoise(ctx, 0.012, 700);

  noise.output.connect(master);

  noise.source.start();

}

function deep(ctx, master) {

  const osc =
    ctx.createOscillator();

  osc.type = "sine";

  osc.frequency.value = 42;

  const gain = ctx.createGain();

  gain.gain.value = 0.018;

  osc.connect(gain);

  gain.connect(master);

  osc.start();

}

const soundMap = {
  rain,
  snow,
  factory,
  train,
  takibi,
  deep,
};

export default function createModeSound(mode) {

  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;

  const ctx =
    new AudioContextClass();

  const master =
    ctx.createGain();

  master.gain.value = 0;

  master.connect(ctx.destination);

  master.gain.linearRampToValueAtTime(
    0.9,
    ctx.currentTime + 2
  );

  const play =
    soundMap[mode];

  if (play) {

    play(ctx, master);

  }

  return ctx;

}