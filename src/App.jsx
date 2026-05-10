import { useEffect, useMemo, useState } from "react";

import "./index.css";
import "./App.css";

import MenuModal from "./components/MenuModal.jsx";
import SoundButton from "./components/SoundButton.jsx";
import StartScreen from "./components/StartScreen.jsx";

import modeList from "./data/modeList.js";

import createModeSound from "./createModeSound.js";

export default function App() {

  const [mode, setMode] = useState("deep");

  const [started, setStarted] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [soundOn, setSoundOn] = useState(false);

  const currentMode = useMemo(() => {

    return (
      modeList.find((m) => m.id === mode) ||
      modeList[0]
    );

  }, [mode]);

  const CurrentComponent =
    currentMode.component;

  useEffect(() => {

    let ctx;

    if (soundOn && currentMode?.sound) {

      ctx = createModeSound(
        currentMode.sound
      );

    }

    return () => {

      if (ctx) {

        ctx.close();

      }

    };

  }, [soundOn, currentMode]);

  return (
    <div
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

          <CurrentComponent />

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

          {menuOpen && (

            <MenuModal
              mode={mode}
              setMode={setMode}
              setMenuOpen={setMenuOpen}
            />

          )}

        </>

      )}

    </div>
  );

}