export default function trainSound(
  ctx,
  master
) {

  const osc =
    ctx.createOscillator();

  osc.type = "triangle";

  osc.frequency.value = 118;

  const gain =
    ctx.createGain();

  gain.gain.value = 0.032;

  const tremolo =
    ctx.createOscillator();

  tremolo.frequency.value = 2.2;

  const tremoloGain =
    ctx.createGain();

  tremoloGain.gain.value = 0.012;

  tremolo.connect(tremoloGain);

  tremoloGain.connect(gain.gain);

  osc.connect(gain);

  gain.connect(master);

  osc.start();

  tremolo.start();

  return () => {

    osc.stop();

    tremolo.stop();

  };

}