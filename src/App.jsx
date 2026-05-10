import { useEffect, useState } from "react";

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

  return (
    <div className="app">

      {/* MENU */}

      <button
        className="menuButton"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>

      {/* START */}

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

      {/* MODE */}

      {started && renderMode()}

      {/* SOUND */}

      {started && (

        <audio autoPlay loop>

          <source
            src="https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3"
            type="audio/mpeg"
          />

        </audio>

      )}

      {/* MODAL */}

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

            {/* よるぐも */}

            <button
              className={`modeButton ${
                mode === "yorugumo" ? "active" : ""
              }`}
              onClick={() => {

                setMode("yorugumo");
                setMenuOpen(false);

              }}
            >

              <span>
                🌙 よるぐも
              </span>

              <small>
                月と雲を眺める夜
              </small>

            </button>

            {/* 雨 */}

            <button
              className={`modeButton ${
                mode === "rain" ? "active" : ""
              }`}
              onClick={() => {

                setMode("rain");
                setMenuOpen(false);

              }}
            >

              <span>
                🌧 雨の夜
              </span>

              <small>
                滲む光と雨粒の夜
              </small>

            </button>

            {/* 雪 */}

            <button
              className={`modeButton ${
                mode === "snow" ? "active" : ""
              }`}
              onClick={() => {

                setMode("snow");
                setMenuOpen(false);

              }}
            >

              <span>
                ❄️ 静かな雪
              </span>

              <small>
                遠くの灯りと積もる雪
              </small>

            </button>

            {/* 焚き火 */}

            <button
              className={`modeButton ${
                mode === "takibi" ? "active" : ""
              }`}
              onClick={() => {

                setMode("takibi");
                setMenuOpen(false);

              }}
            >

              <span>
                🔥 焚き火
              </span>

              <small>
                暗い夜と小さな火
              </small>

            </button>

            {/* 深海 */}

            <button
              className={`modeButton ${
                mode === "deepsea" ? "active" : ""
              }`}
              onClick={() => {

                setMode("deepsea");
                setMenuOpen(false);

              }}
            >

              <span>
                🌊 深海
              </span>

              <small>
                青く静かな深い夜
              </small>

            </button>

            {/* 夜行列車 */}

            <button
              className={`modeButton ${
                mode === "train" ? "active" : ""
              }`}
              onClick={() => {

                setMode("train");
                setMenuOpen(false);

              }}
            >

              <span>
                🚃 夜行列車
              </span>

              <small>
                流れる灯りと眠い移動
              </small>

            </button>

            {/* 工場 */}

            <button
              className={`modeButton ${
                mode === "factory" ? "active" : ""
              }`}
              onClick={() => {

                setMode("factory");
                setMenuOpen(false);

              }}
            >

              <span>
                🏭 海辺の工場
              </span>

              <small>
                海越しに眺める深夜の灯り
              </small>

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