export default function createNoise(
  ctx,
  gainValue,
  filterFreq
) {

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