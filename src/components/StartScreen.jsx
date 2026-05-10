import "./StartScreen.css";

import modeList from "../data/modeList.js";

export default function StartScreen({
  mode,
  setMode,
  soundOn,
  setSoundOn,
  sleepTimer,
  setSleepTimer,
  setStarted,
}) {

  const currentIndex =
    modeList.findIndex(
      (m) => m.id === mode
    );

  const currentMode =
    modeList[currentIndex];

  function prevMode() {

    const next =
      currentIndex <= 0
        ? modeList.length - 1
        : currentIndex - 1;

    setMode(modeList[next].id);

  }

  function nextMode() {

    const next =
      currentIndex >=
      modeList.length - 1
        ? 0
        : currentIndex + 1;

    setMode(modeList[next].id);

  }

  return (
    <div className="startScreen">

      <div className="startInner">

        <div className="startLogo">

          <div className="startTitle">
            うとうと
          </div>

          <div className="startSub">
            少しだけ静かな場所へ
          </div>

        </div>

        <div className="heroCard">

          <div className="heroGlow" />

          <div className="heroIcon">
            {currentMode.icon}
          </div>

          <div className="heroName">
            {currentMode.name}
          </div>

          <div className="heroDescription">
            {currentMode.description}
          </div>

        </div>

        <div className="switchArea">

          <button
            className="switchButton"
            onClick={prevMode}
          >
            ◀
          </button>

          <button
            className="switchButton"
            onClick={nextMode}
          >
            ▶
          </button>

        </div>

        <div className="settingArea">

          <button
            className="settingButton"
            onClick={() => {
              setSoundOn(!soundOn);
            }}
          >
            {soundOn
              ? "音を流している"
              : "音を流す"}
          </button>

          <select
            className="timerSelect"
            value={sleepTimer}
            onChange={(e) => {
              setSleepTimer(
                Number(e.target.value)
              );
            }}
          >
            <option value={0}>
              タイマーなし
            </option>

            <option value={300000}>
              5分
            </option>

            <option value={900000}>
              15分
            </option>

            <option value={1800000}>
              30分
            </option>

          </select>

        </div>

        <button
          className="startButton"
          onClick={() => {
            setStarted(true);
          }}
        >
          はじめる
        </button>

      </div>

    </div>
  );
}