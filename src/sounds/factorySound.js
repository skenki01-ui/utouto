export default function factorySound(
  ctx,
  master
) {

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