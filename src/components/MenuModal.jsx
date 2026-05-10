import "./MenuModal.css";

import modeList from "../data/modeList";

export default function MenuModal({
  mode,
  setMode,
  soundOn,
  setSoundOn,
  sleepTimer,
  setSleepTimer,
  setStarted,
  setMenuOpen,
}) {

  return (
    <div
      className="menuOverlay"
      onClick={() => {
        setMenuOpen(false);
      }}
    >

      <div
        className="menuSheet"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >

        <div className="menuTitle">
          少し調整する
        </div>

        <div className="menuSection">

          <div className="menuLabel">
            夜を選ぶ
          </div>

          <div className="modeRow">

            {modeList.map((item) => (

              <button
                key={item.id}
                className={
                  mode === item.id
                    ? "modeMini active"
                    : "modeMini"
                }
                onClick={() => {
                  setMode(item.id);
                }}
              >

                <div className="modeMiniIcon">
                  {item.icon}
                </div>

                <div className="modeMiniName">
                  {item.name}
                </div>

              </button>

            ))}

          </div>

        </div>

        <div className="menuSection">

          <div className="menuLabel">
            音
          </div>

          <button
            className="menuButtonLarge"
            onClick={() => {

              setSoundOn(!soundOn);

            }}
          >
            {soundOn
              ? "音を止める"
              : "音を流す"}
          </button>

        </div>

        <div className="menuSection">

          <div className="menuLabel">
            タイマー
          </div>

          <select
            className="menuSelect"
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
          className="sleepButton"
          onClick={() => {

            setStarted(false);

            setMenuOpen(false);

          }}
        >
          おやすみする
        </button>

      </div>

    </div>
  );
}