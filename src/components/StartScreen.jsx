import "./StartScreen.css";

import modeList from "../data/modeList";

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

  const current =
    modeList[currentIndex];

  function prevMode() {

    const newIndex =
      currentIndex === 0
        ? modeList.length - 1
        : currentIndex - 1;

    setMode(
      modeList[newIndex].id
    );

  }

  function nextMode() {

    const newIndex =
      currentIndex ===
      modeList.length - 1
        ? 0
        : currentIndex + 1;

    setMode(
      modeList[newIndex].id
    );

  }

  return (
    <div className="startScreen">

      <div className="backgroundGlow" />

      <div className="startInner">

        <div className="titleArea">

          <div className="mainTitle">
            うとうと
          </div>

          <div className="subTitle">
            少しだけ静かな場所へ
          </div>

        </div>

        <div className="modeCard">

          <div className="modeTop">

            <button
              className="arrowButton"
              onClick={prevMode}
            >
              ◀
            </button>

            <div className="modeInfo">

              <div className="modeIcon">
                {current.icon}
              </div>

              <div className="modeName">
                {current.name}
              </div>

              <div className="modeDescription">
                {current.description}
              </div>

            </div>

            <button
              className="arrowButton"
              onClick={nextMode}
            >
              ▶
            </button>

          </div>

          <button
            className="soundButtonLarge"
            onClick={() => {

              setSoundOn(!soundOn);

            }}
          >
            {soundOn
              ? "音を止める"
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

    </div>
  );
}