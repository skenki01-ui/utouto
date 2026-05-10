import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./index.css";
import "./App.css";

import StartScreen from "./components/StartScreen.jsx";

import modeList from "./data/modeList.js";

import createModeSound from "./sounds/createModeSound.js";

export default function App() {

  const [mode, setMode] =
    useState("yorugumo");

  const [started, setStarted] =
    useState(false);

  const [soundOn, setSoundOn] =
    useState(false);

  const [audioInstance, setAudioInstance] =
    useState(null);

  const [sleepTimer, setSleepTimer] =
    useState(0);

  const [visible, setVisible] =
    useState(true);

  const [showLabel, setShowLabel] =
    useState(true);

  const [showUi, setShowUi] =
    useState(true);

  const [showAdjust, setShowAdjust] =
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

  useEffect(() => {

    if (!soundOn) {
      return;
    }

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

        if (
          audioInstance?.fadeOut
        ) {

          audioInstance.fadeOut();

        }

        setAudioInstance(null);

        setSoundOn(false);

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

  }, [mode]);

  /* ---------- auto hide ui ---------- */

  useEffect(() => {

    if (!started) return;

    setShowUi(true);

    const timer =
      setTimeout(() => {

        setShowUi(false);

        setShowAdjust(true);

      }, 4200);

    return () =>
      clearTimeout(timer);

  }, [started, mode]);

  function wakeUi() {

    setShowUi(true);

    setShowAdjust(false);

    setTimeout(() => {

      setShowUi(false);

      setShowAdjust(true);

    }, 4200);

  }

  return (
    <div
      className="app"
      onClick={() => {

        if (started) {

          wakeUi();

        }

      }}
    >

      {!started ? (

        <StartScreen
          mode={mode}
          setMode={setMode}
          soundOn={soundOn}
          setSoundOn={(next) => {

            if (!soundOn) {

              const audio =
                createModeSound(
                  currentMode.sound
                );

              setAudioInstance(audio);

              setSoundOn(true);

            } else {

              if (
                audioInstance?.fadeOut
              ) {

                audioInstance.fadeOut();

              }

              setAudioInstance(null);

              setSoundOn(false);

            }

          }}
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

          {/* ---------- UI ---------- */}

          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,

              display: "flex",
              gap: "10px",

              opacity:
                showUi ? 1 : 0,

              transition:
                "opacity 1.8s ease",

              pointerEvents:
                showUi
                  ? "auto"
                  : "none",

              zIndex: 50,
            }}
          >

            <button
              className="menuButton"
              onClick={(e) => {

                e.stopPropagation();

                setStarted(false);

              }}
            >
              ✕
            </button>

            <button
              className="menuButton"
              onClick={(e) => {

                e.stopPropagation();

                if (!soundOn) {

                  const audio =
                    createModeSound(
                      currentMode.sound
                    );

                  setAudioInstance(audio);

                  setSoundOn(true);

                } else {

                  if (
                    audioInstance?.fadeOut
                  ) {

                    audioInstance.fadeOut();

                  }

                  setAudioInstance(null);

                  setSoundOn(false);

                }

              }}
            >
              {soundOn
                ? "♫"
                : "◯"}
            </button>

          </div>

          {/* ---------- adjust ---------- */}

          <button
            onClick={(e) => {

              e.stopPropagation();

              setShowUi(true);

              setShowAdjust(false);

            }}
            style={{
              position: "absolute",

              right: 20,
              bottom: 28,

              width: 52,
              height: 52,

              borderRadius: "50%",

              border: "none",

              background:
                "rgba(255,255,255,0.08)",

              backdropFilter:
                "blur(12px)",

              color: "white",

              fontSize: "20px",

              opacity:
                showAdjust
                  ? 1
                  : 0,

              transition:
                "opacity 1.8s ease",

              pointerEvents:
                showAdjust
                  ? "auto"
                  : "none",

              zIndex: 60,
            }}
          >
            ︙
          </button>

        </>

      )}

    </div>
  );

}