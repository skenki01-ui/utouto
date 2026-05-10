export default function deepSound(
  ctx,
  master
) {

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