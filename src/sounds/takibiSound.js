import createNoise from "./createNoise";

export default function takibiSound(
  ctx,
  master
) {

  const noise =
    createNoise(ctx, 0.012, 700);

  noise.output.connect(master);

  noise.source.start();

}