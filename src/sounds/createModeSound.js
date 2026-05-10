import rainSound from "./rainSound";
import snowSound from "./snowSound";
import takibiSound from "./takibiSound";
import deepSound from "./deepSound";
import trainSound from "./trainSound";
import factorySound from "./factorySound";

const soundMap = {
  rain: rainSound,
  snow: snowSound,
  takibi: takibiSound,
  deep: deepSound,
  train: trainSound,
  factory: factorySound,
};

export default function createModeSound(
  mode
) {

  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;

  const ctx =
    new AudioContextClass();

  const master =
    ctx.createGain();

  master.gain.value = 0;

  master.connect(ctx.destination);

  master.gain.linearRampToValueAtTime(
    0.9,
    ctx.currentTime + 2
  );

  const play =
    soundMap[mode];

  if (play) {

    play(ctx, master);

  }

  return {

    fadeOut: () => {

      master.gain.cancelScheduledValues(
        ctx.currentTime
      );

      master.gain.linearRampToValueAtTime(
        0,
        ctx.currentTime + 1.8
      );

      setTimeout(() => {

        ctx.close();

      }, 1900);

    },

  };

}