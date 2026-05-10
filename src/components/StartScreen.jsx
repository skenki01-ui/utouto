export default function StartScreen({
  setStarted,
}) {

  return (
    <div className="startScreen">

      <div className="startInner">

        <div className="title">
          🌙 うとうと
        </div>

        <div className="message">
          部屋、暗くした？
        </div>

        <div className="message sub">
          通知を閉じて、
          <br />
          少しだけ目を休めよう
        </div>

        <div
          style={{
            fontSize: "12px",

            lineHeight: 1.8,

            color:
              "rgba(255,255,255,0.38)",

            marginBottom: "34px",
          }}
        >
          画面を少し遠ざけて、
          <br />
          深呼吸したら始めよう
        </div>

        <button
          className="startButton"
          onClick={() => setStarted(true)}
        >
          うとうとする
        </button>

      </div>

    </div>
  );

}