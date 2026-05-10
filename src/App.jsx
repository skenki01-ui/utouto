import { useEffect, useRef, useState } from "react";

import "./index.css";
import "./App.css";

import Yorugumo from "./modes/Yorugumo.jsx";
import RainNight from "./modes/RainNight.jsx";
import SnowNight from "./modes/SnowNight.jsx";
import Takibi from "./modes/Takibi.jsx";
import DeepSea from "./modes/DeepSea.jsx";
import NightTrain from "./modes/NightTrain.jsx";
import FactoryNight from "./modes/FactoryNight.jsx";

export default function App() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState("yorugumo");
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    let vibrationInterval;

    if (started && navigator.vibrate) {
      vibrationInterval = setInterval(() => {
        navigator.vibrate([80]);
      }, 7000);
    }

    return () => {
      clearInterval(vibrationInterval);

      if (navigator.vibrate) {
        navigator.vibrate(0);
      }
    };
  }, [started]);

  useEffect(() => {
    if (!started || !soundOn) {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current = null;
      }

      return;
    }

    const audio = createModeSound(mode);

    audioRef.current = audio;

    return () => {
      audio.stop();
      audioRef.current = null;
    };
  }, [started, soundOn, mode]);

  const createNoiseBuffer = (audioContext, seconds = 2) => {
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * seconds, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    return buffer;
  };

  const createNoiseSource = (audioContext, destination, options = {}) => {
    const {
      volume = 0.02,
      filterType = "lowpass",
      frequency = 800,
      q = 0.6,
    } = options;

    const source = audioContext.createBufferSource();
    source.buffer = createNoiseBuffer(audioContext, 2);
    source.loop = true;

    const filter = audioContext.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = q;

    const gain = audioContext.createGain();
    gain.gain.value = volume;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    source.start();

    return source;
  };

  const createOscillator = (audioContext, destination, options = {}) => {
    const {
      type = "sine",
      frequency = 80,
      volume = 0.01,
    } = options;

    const oscillator = audioContext.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;

    const gain = audioContext.createGain();
    gain.gain.value = volume;

    oscillator.connect(gain);
    gain.connect(destination);

    oscillator.start();

    return oscillator;
  };

  const createModeSound = (currentMode) => {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    const audioContext = new AudioContextClass();

    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.65;
    masterGain.connect(audioContext.destination);

    const nodes = [];
    const timers = [];

    if (currentMode === "rain") {
      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.028,
          filterType: "lowpass",
          frequency: 1300,
          q: 0.5,
        })
      );

      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.012,
          filterType: "bandpass",
          frequency: 520,
          q: 0.8,
        })
      );
    }

    if (currentMode === "snow") {
      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.009,
          filterType: "lowpass",
          frequency: 420,
          q: 0.4,
        })
      );
    }

    if (currentMode === "takibi") {
      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.012,
          filterType: "lowpass",
          frequency: 900,
          q: 0.6,
        })
      );

      const crackle = setInterval(() => {
        const burst = audioContext.createBufferSource();
        burst.buffer = createNoiseBuffer(audioContext, 0.08);

        const filter = audioContext.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 1600 + Math.random() * 1200;
        filter.Q.value = 2;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.035,
          audioContext.currentTime + 0.01
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          audioContext.currentTime + 0.08
        );

        burst.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        burst.start();
        burst.stop(audioContext.currentTime + 0.09);
      }, 1600 + Math.random() * 1400);

      timers.push(crackle);
    }

    if (currentMode === "deepsea") {
      nodes.push(
        createOscillator(audioContext, masterGain, {
          type: "sine",
          frequency: 58,
          volume: 0.012,
        })
      );

      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.01,
          filterType: "lowpass",
          frequency: 260,
          q: 0.4,
        })
      );
    }

    if (currentMode === "train") {
      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.014,
          filterType: "lowpass",
          frequency: 520,
          q: 0.5,
        })
      );

      const trainBeat = setInterval(() => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = 72;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.025,
          audioContext.currentTime + 0.02
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          audioContext.currentTime + 0.22
        );

        oscillator.connect(gain);
        gain.connect(masterGain);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.24);
      }, 1800);

      timers.push(trainBeat);
    }

    if (currentMode === "factory") {
      nodes.push(
        createOscillator(audioContext, masterGain, {
          type: "sine",
          frequency: 64,
          volume: 0.009,
        })
      );

      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.011,
          filterType: "lowpass",
          frequency: 380,
          q: 0.4,
        })
      );
    }

    if (currentMode === "yorugumo") {
      nodes.push(
        createNoiseSource(audioContext, masterGain, {
          volume: 0.01,
          filterType: "lowpass",
          frequency: 460,
          q: 0.4,
        })
      );
    }

    return {
      stop: () => {
        timers.forEach((timer) => clearInterval(timer));

        nodes.forEach((node) => {
          try {
            node.stop();
          } catch {
            // already stopped
          }
        });

        audioContext.close();
      },
    };
  };

  const renderMode = () => {
    if (mode === "rain") {
      return <RainNight />;
    }

    if (mode === "snow") {
      return <SnowNight />;
    }

    if (mode === "takibi") {
      return <Takibi />;
    }

    if (mode === "deepsea") {
      return <DeepSea />;
    }

    if (mode === "train") {
      return <NightTrain />;
    }

    if (mode === "factory") {
      return <FactoryNight />;
    }

    return <Yorugumo />;
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <button
        className="menuButton"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>

      {started && (
        <button
          onClick={() => setSoundOn((current) => !current)}
          style={{
            position: "absolute",
            top: "18px",
            left: "18px",
            zIndex: 100,
            width: "42px",
            height: "42px",
            borderRadius: "999px",
            border: "none",
            background: soundOn
              ? "rgba(255,255,255,0.16)"
              : "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {soundOn ? "♪" : "♪"}
        </button>
      )}

      {!started && (
        <div className="startScreen">
          <div className="startInner">
            <div className="title">
              🌙 うとうと
            </div>

            <div className="message">
              部屋、暗くした？
            </div>

            <div className="message sub">
              大きく息を吸って、
              <br />
              ゆっくり全部吐いたら始めよう
            </div>

            <button
              className="startButton"
              onClick={() => setStarted(true)}
            >
              うとうとする
            </button>
          </div>
        </div>
      )}

      {started && renderMode()}

      {menuOpen && (
        <div
          className="modalOverlay"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="menuModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menuTitle">
              夜をえらぶ
            </div>

            <button
              className={`modeButton ${
                mode === "yorugumo" ? "active" : ""
              }`}
              onClick={() => changeMode("yorugumo")}
            >
              <span>🌙 よるぐも</span>

              <small>月と雲を眺める夜</small>

            </button>

            <button

              className={`modeButton ${

                mode === "rain" ? "active" : ""

              }`}

              onClick={() => changeMode("rain")}

            >

              <span>🌧 雨の夜</span>

              <small>滲む光と雨粒の夜</small>

            </button>

            <button

              className={`modeButton ${

                mode === "snow" ? "active" : ""

              }`}

              onClick={() => changeMode("snow")}

            >

              <span>❄️ 静かな雪</span>

              <small>遠くの灯りと積もる雪</small>

            </button>

            <button

              className={`modeButton ${

                mode === "takibi" ? "active" : ""

              }`}

              onClick={() => changeMode("takibi")}

            >

              <span>🔥 焚き火</span>

              <small>暗い夜と小さな火</small>

            </button>

            <button

              className={`modeButton ${

                mode === "deepsea" ? "active" : ""

              }`}

              onClick={() => changeMode("deepsea")}

            >

              <span>🌊 深海</span>

              <small>青く静かな深い夜</small>

            </button>

            <button

              className={`modeButton ${

                mode === "train" ? "active" : ""

              }`}

              onClick={() => changeMode("train")}

            >

              <span>🚃 夜行列車</span>

              <small>流れる灯りと眠い移動</small>

            </button>

            <button

              className={`modeButton ${

                mode === "factory" ? "active" : ""

              }`}

              onClick={() => changeMode("factory")}

            >

              <span>🏭 海辺の工場</span>

              <small>海越しに眺める深夜の灯り</small>

            </button>

            <div className="menuNote">

              7つの夜が完成しました

            </div>

            <button

              className="closeButton"

              onClick={() => setMenuOpen(false)}

            >

              とじる

            </button>

          </div>

        </div>

      )}

    </div>

  );

}