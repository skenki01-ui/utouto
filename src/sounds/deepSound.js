export default function deepSound(
  ctx,
  master
) {

  const osc1 =
    ctx.createOscillator();

  osc1.type = "sine";

  osc1.frequency.value = 82;

  const osc2 =
    ctx.createOscillator();

  osc2.type = "triangle";

  osc2.frequency.value = 146;

  const gain =
    ctx.createGain();

  gain.gain.value = 0.045;

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