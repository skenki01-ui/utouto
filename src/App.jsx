import { useEffect, useMemo, useState } from "react";

import "./index.css";
import "./App.css";

import MenuModal from "./components/MenuModal.jsx";
import SoundButton from "./components/SoundButton.jsx";
import StartScreen from "./components/StartScreen.jsx";

import modeList from "./data/modeList.js";

import createModeSound from "./sounds/createModeSound.js";

export default function App() {

  const [mode, setMode] = useState("deep");

  const [started, setStarted] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [soundOn, setSoundOn] = useState(false);

  const [sleepTimer, setSleepTimer] =
    useState(0);

  const [visible, setVisible] =
    useState(true);

  const [showLabel, setShowLabel] =
    useState(true);

  const [uiVisible, setUiVisible] =
    useState(true);

  const currentMode = useMemo(() => {

    return (
      modeList.find((m) => m.id === mode) ||
      modeList[0]
    );

  }, [mode]);

  const CurrentComponent =
    currentMode.component;

  useEffect(() => {

    let audio;

    if (soundOn && currentMode?.sound) {

      audio = createModeSound(
        currentMode.sound
      );

    }

    return () => {

      if (audio?.fadeOut) {

        audio.fadeOut();

      }

    };

  }, [soundOn, currentMode]);

  useEffect(() => {

    if (!soundOn || sleepTimer === 0) {
      return;
    }

    const timer = setTimeout(() => {

      setSoundOn(false);

    }, sleepTimer);

    return () => clearTimeout(timer);

  }, [soundOn, sleepTimer]);

  useEffect(() => {

    setVisible(false);

    setShowLabel(true);

    if (
      navigator.vibrate &&
      started
    ) {

      navigator.vibrate(10);

    }

    const fadeTimer = setTimeout(() => {

      setVisible(true);

    }, 220);

    const labelTimer = setTimeout(() => {

      setShowLabel(false);

    }, 2600);

    return () => {

      clearTimeout(fadeTimer);

      clearTimeout(labelTimer);

    };

  }, [mode]);

  useEffect(() => {

    const hideTimer = setTimeout(() => {

      setUiVisible(false);

    }, 4200);

    return () => clearTimeout(hideTimer);

  }, [uiVisible]);

  function wakeUI() {

    setUiVisible(true);

  }

  return (
    <div
      className="app"
      onTouchStart={wakeUI}
      onMouseMove={wakeUI}
      onClick={wakeUI}
      style={{
        width: "100%",
        height: "100vh",

        overflow: "hidden",

        position: "relative",

        background: "black",
      }}
    >

      {!started ? (

        <StartScreen
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

          <div
            style={{
              opacity:
                uiVisible ? 1 : 0.16,

              transition:
                "opacity 1.8s ease",
            }}
          >

            <button
              onClick={() => setMenuOpen(true)}
              style={{
                position: "absolute",

                top: "18px",
                right: "18px",

                width: "42px",
                height: "42px",

                borderRadius: "50%",

                border: "none",

                background:
                  "rgba(255,255,255,0.10)",

                color: "white",

                backdropFilter: "blur(10px)",
                WebkitBackdropFilter:
                  "blur(10px)",

                cursor: "pointer",

                zIndex: 50,

                fontSize: "18px",
              }}
            >
              ☰
            </button>

            <SoundButton
              soundOn={soundOn}
              setSoundOn={setSoundOn}
            />

          </div>

          {menuOpen && (

            <MenuModal
              mode={mode}
              setMode={setMode}
              setMenuOpen={setMenuOpen}
              sleepTimer={sleepTimer}
              setSleepTimer={setSleepTimer}
            />

          )}

        </>

      )}

    </div>
  );

}