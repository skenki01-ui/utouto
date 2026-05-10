import rainSound from "./rainSound.js";
import snowSound from "./snowSound.js";
import factorySound from "./factorySound.js";
import trainSound from "./trainSound.js";
import takibiSound from "./takibiSound.js";
import deepSound from "./deepSound.js";

const soundMap = {
  rain: rainSound,
  snow: snowSound,
  factory: factorySound,
  train: trainSound,
  takibi: takibiSound,
  deep: deepSound,
};

export default function createModeSound(mode) {

  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;

  const ctx =
    new AudioContextClass();

  /* iPhone対策 */

  if (ctx.state === "suspended") {

    ctx.resume();

  }

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

    ctx,

    fadeOut() {

      master.gain.linearRampToValueAtTime(
        0,
        ctx.currentTime + 1.8
      );

      setTimeout(() => {

        ctx.close();

      }, 2200);

    },

  };

}