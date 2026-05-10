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

  return (
    <div className="startScreen">

      <div className="startOverlay" />

      <div className="startInner">

        <div className="logo">
          うとうと
        </div>

        <div className="subText">
          少しだけ
          静かな場所へ
        </div>

        <div className="modeGrid">

          {modeList.map((item) => (

            <button
              key={item.id}
              className={
                mode === item.id
                  ? "modeCard active"
                  : "modeCard"
              }
              onClick={() => setMode(item.id)}
            >

              <div className="modeIcon">
                {item.icon}
              </div>

              <div className="modeName">
                {item.name}
              </div>

              <div className="modeDescription">
                {item.description}
              </div>

            </button>

          ))}

        </div>

        <div className="settingArea">

          <button
            className="settingButton"
            onClick={() =>
              setSoundOn(!soundOn)
            }
          >
            {soundOn
              ? "音を流している"
              : "音を止めている"}
          </button>

          <select
            className="timerSelect"
            value={sleepTimer}
            onChange={(e) =>
              setSleepTimer(
                Number(e.target.value)
              )
            }
          >

            <option value={0}>
              タイマーなし
            </option>

            <option value={900000}>
              15分
            </option>

            <option value={1800000}>
              30分
            </option>

            <option value={3600000}>
              1時間
            </option>

          </select>

        </div>

        <button
          className="startButton"
          onClick={() =>
            setStarted(true)
          }
        >
          はじめる
        </button>

      </div>

    </div>
  );
}