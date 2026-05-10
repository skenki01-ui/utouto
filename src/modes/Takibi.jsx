import "./Takibi.css";

export default function Takibi() {
  return (
    <div className="window">

      <div className="takibiSky">

        {/* 火 */}

        <div className="fireGlow" />

        <div className="fire fire1" />
        <div className="fire fire2" />
        <div className="fire fire3" />

        {/* 火の粉 */}

        <div className="ember ember1" />
        <div className="ember ember2" />
        <div className="ember ember3" />
        <div className="ember ember4" />
        <div className="ember ember5" />

      </div>

    </div>
  );
}