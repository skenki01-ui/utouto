import { useEffect, useMemo, useState } from "react";

import "./index.css";
import "./App.css";

import StartScreen from "./components/StartScreen.jsx";

import modeList from "./data/modeList.js";

import createModeSound from "./sounds/createModeSound.js";

export default function App() {

  const [mode, setMode] =
    useState("deep");

  const [started, setStarted] =
    useState(false);

  const [soundOn, setSoundOn] =
    useState(true);

  const [sleepTimer, setSleepTimer] =
    useState(0);

  const [visible, setVisible] =
    useState(true);

  const [showLabel, setShowLabel] =
    useState(true);

  const currentMode = useMemo(() => {

    return (
      modeList.find(
        (m) => m.id === mode
      ) || modeList[0]
    );

  }, [mode]);

  const CurrentComponent =
    currentMode.component;

  useEffect(() => {

    let audio;

    if (
      started &&
      soundOn &&
      currentMode?.sound
    ) {

      audio = createModeSound(
        currentMode.sound
      );

    }

    return () => {

      if (audio?.fadeOut) {

        audio.fadeOut();

      }

    };

  }, [
    started,
    soundOn,
    currentMode
  ]);

  useEffect(() => {

    if (
      !started ||
      !soundOn ||
      sleepTimer === 0
    ) {
      return;
    }

    const timer = setTimeout(() => {

      setSoundOn(false);

    }, sleepTimer);

    return () =>
      clearTimeout(timer);

  }, [
    started,
    soundOn,
    sleepTimer
  ]);

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

  return (
    <div className="app">

      {!started ? (

        <StartScreen
          mode={mode}
          setMode={setMode}
          soundOn={soundOn}
          setSoundOn={setSoundOn}
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

        </>

      )}

    </div>
  );

}