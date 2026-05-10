import "./SnowNight.css";

export default function SnowNight() {
  return (
    <div className="window">

      <div className="snowSky">

        {/* 遠くの灯り */}
        <div className="snowLight" />

        {/* 積もる雪 */}
        <div className="snowBottom" />

        {/* 雪 */}
        <div className="snow snow1" />
        <div className="snow snow2" />
        <div className="snow snow3" />
        <div className="snow snow4" />
        <div className="snow snow5" />
        <div className="snow snow6" />
        <div className="snow snow7" />
        <div className="snow snow8" />

      </div>

    </div>
  );
}