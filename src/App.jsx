import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./index.css";
import "./App.css";

import StartScreen from "./components/StartScreen.jsx";
import MenuModal from "./components/MenuModal.jsx";

import modeList from "./data/modeList.js";

import createModeSound from "./sounds/createModeSound.js";

export default function App() {

  const [mode, setMode] =
    useState("yorugumo");

  const [started, setStarted] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [soundOn, setSoundOn] =
    useState(false);

  const [vibrationOn, setVibrationOn] =
    useState(false);

  const [audioInstance, setAudioInstance] =
    useState(null);

  const [sleepTimer, setSleepTimer] =
    useState(0);

  const [visible, setVisible] =
    useState(true);

  const [showLabel, setShowLabel] =
    useState(true);

  const [showControls, setShowControls] =
    useState(true);

  const [sleepScreen, setSleepScreen] =
    useState(false);

  const [idleSleep, setIdleSleep] =
    useState(false);

  const currentMode = useMemo(() => {

    return (
      modeList.find(
        (m) => m.id === mode
      ) || modeList[0]
    );

  }, [mode]);

  const CurrentComponent =
    currentMode.component;

  /* ---------- sound ---------- */

  function stopAudio() {

    if (audioInstance?.fadeOut) {

      audioInstance.fadeOut();

    }

    setAudioInstance(null);

    setSoundOn(false);

  }

  function startAudio() {

    const audio =
      createModeSound(
        currentMode.sound
      );

    setAudioInstance(audio);

    setSoundOn(true);

  }

  function toggleSound() {

    if (soundOn) {

      stopAudio();

    } else {

      startAudio();

    }

  }

  /* ---------- vibration ---------- */

  useEffect(() => {

    if (
      !started ||
      !vibrationOn
    ) {
      return;
    }

    if (!navigator.vibrate) {
      return;
    }

    const interval =
      setInterval(() => {

        navigator.vibrate(10);

      }, 22000);

    return () => {

      clearInterval(interval);

      navigator.vibrate(0);

    };

  }, [
    started,
    vibrationOn,
  ]);

  /* ---------- mode ---------- */

  useEffect(() => {

    if (!soundOn) return;

    if (audioInstance?.fadeOut) {

      audioInstance.fadeOut();

    }

    const audio =
      createModeSound(
        currentMode.sound
      );

    setAudioInstance(audio);

    return () => {

      if (audio?.fadeOut) {

        audio.fadeOut();

      }

    };

  }, [mode]);

  /* ---------- sleep timer ---------- */

  useEffect(() => {

    if (
      !soundOn ||
      sleepTimer === 0
    ) {
      return;
    }

    const timer =
      setTimeout(() => {

        stopAudio();

      }, sleepTimer);

    return () =>
      clearTimeout(timer);

  }, [
    soundOn,
    sleepTimer,
    audioInstance,
  ]);

  /* ---------- mode label ---------- */

  useEffect(() => {

    if (!started) return;

    setVisible(false);

    setShowLabel(true);

    const fadeTimer =
      setTimeout(() => {

        setVisible(true);

      }, 220);

    const labelTimer =
      setTimeout(() => {

        setShowLabel(false);

      }, 2600);

    return () => {

      clearTimeout(fadeTimer);

      clearTimeout(labelTimer);

    };

  }, [mode, started]);

  /* ---------- auto hide ---------- */

  useEffect(() => {

    if (!started) return;

    setShowControls(true);

    const timer =
      setTimeout(() => {

        setShowControls(false);

      }, 4200);

    return () =>
      clearTimeout(timer);

  }, [started, mode]);

  function wakeControls() {

    setShowControls(true);

    const timer =
      setTimeout(() => {

        setShowControls(false);

      }, 4200);

    return () =>
      clearTimeout(timer);

  }

  /* ---------- idle sleep ---------- */

  useEffect(() => {

    if (!started) return;

    let timer;

    function resetIdle() {

      clearTimeout(timer);

      timer = setTimeout(() => {

        stopAudio();

        setIdleSleep(true);

      }, 1000 * 60 * 60);

    }

    resetIdle();

    window.addEventListener(
      "touchstart",
      resetIdle
    );

    window.addEventListener(
      "mousemove",
      resetIdle
    );

    return () => {

      clearTimeout(timer);

      window.removeEventListener(
        "touchstart",
        resetIdle
      );

      window.removeEventListener(
        "mousemove",
        resetIdle
      );

    };

  }, [started]);

  /* ---------- sleep ---------- */

  function sleepNow() {

    stopAudio();

    setMenuOpen(false);

    setSleepScreen(true);

    setTimeout(() => {

      setStarted(false);

      setSleepScreen(false);

    }, 1800);

  }

  return (
    <div
      className="app"
      onClick={() => {

        if (started) {

          wakeControls();

        }

      }}
    >

      {!started ? (

        <StartScreen
          mode={mode}
          setMode={setMode}
          soundOn={soundOn}
          setSoundOn={toggleSound}
          sleepTimer={sleepTimer}
          setSleepTimer={setSleepTimer}
          setStarted={setStarted}
        />

      ) : (

        <>

          <div
            className={
              visible
                ? "mode-visible"
                : "mode-hidden"
            }
          >
            <CurrentComponent />
          </div>

          {/* ---------- label ---------- */}

          <div
            className={
              showLabel
                ? "mode-label-visible"
                : "mode-label-hidden"
            }
          >

            <div className="mode-label-name">
              {currentMode.icon}
              {" "}
              {currentMode.name}
            </div>

            <div className="mode-label-description">
              {currentMode.description}
            </div>

          </div>

          {/* ---------- menu button ---------- */}

          <div
            style={{
              position: "absolute",

              top: 20,
              right: 20,

              zIndex: 50,

              opacity:
                showControls
                  ? 1
                  : 0,

              transition:
                "opacity 1.8s ease",

              pointerEvents:
                showControls
                  ? "auto"
                  : "none",
            }}
          >

            <button
              className="menuButton"
              onClick={(e) => {

                e.stopPropagation();

                setMenuOpen(true);

              }}
            >
              ︙
            </button>

          </div>

          {/* ---------- menu ---------- */}
{menuOpen && (

  <MenuModal
    mode={mode}
    setMode={setMode}
    soundOn={soundOn}
    toggleSound={toggleSound}
    vibrationOn={vibrationOn}
    setVibrationOn={setVibrationOn}
    sleepTimer={sleepTimer}
    setSleepTimer={setSleepTimer}
    setStarted={setStarted}
    setMenuOpen={setMenuOpen}
    sleepNow={sleepNow}
  />

)}
          {/* ---------- sleep ---------- */}

          {sleepScreen && (

            <div
              style={{
                position: "absolute",

                inset: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: "black",

                color:
                  "rgba(255,255,255,0.72)",

                fontSize: "22px",

                letterSpacing: "0.12em",

                zIndex: 200,

                animation:
                  "sleepFade 1.8s ease",
              }}
            >
              おやすみ
            </div>

          )}

          {/* ---------- idle sleep ---------- */}

          {idleSleep && (

            <div
              style={{
                position: "absolute",

                inset: 0,

                background: "black",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color:
                  "rgba(255,255,255,0.58)",

                fontSize: "20px",

                letterSpacing: "0.12em",

                zIndex: 220,
              }}
            >
              おやすみ
            </div>

          )}

        </>

      )}

    </div>
  );

}