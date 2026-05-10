import createNoise from "./createNoise";

export default function rainSound(
  ctx,
  master
) {

  const noise =
    createNoise(ctx, 0.018, 1200);

  noise.output.connect(master);

  noise.source.start();

}