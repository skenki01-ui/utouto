export default function factorySound(
  ctx,
  master
) {

  const osc1 =
    ctx.createOscillator();

  osc1.type = "sawtooth";

  osc1.frequency.value = 92;

  const osc2 =
    ctx.createOscillator();

  osc2.type = "sine";

  osc2.frequency.value = 138;

  const gain =
    ctx.createGain();

  gain.gain.value = 0.022;

  osc1.connect(gain);
  osc2.connect(gain);

  gain.connect(master);

  osc1.start();
  osc2.start();

  return () => {

    osc1.stop();
    osc2.stop();

  };

}