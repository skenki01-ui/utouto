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
  );

}