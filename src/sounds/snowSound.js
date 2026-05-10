import createNoise from "./createNoise";

export default function snowSound(
  ctx,
  master
) {

  const noise =
    createNoise(ctx, 0.008, 500);

  noise.output.connect(master);

  noise.source.start();

}