import { useEffect, useMemo, useState } from "react";

import "./index.css";
import "./App.css";

import MenuModal from "./components/MenuModal.jsx";
import SoundButton from "./components/SoundButton.jsx";
import StartScreen from "./components/StartScreen.jsx";

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

  const [audioInstance, setAudioInstance] =
    useState(null);

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

  return (
    <div className="app">

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

          <button
            onClick={() => {
              setMenuOpen(true);
            }}
            className="menuButton"
          >
            ☰
          </button>

          <SoundButton
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
          />

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