export default function trainSound(
  ctx,
  master
) {

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