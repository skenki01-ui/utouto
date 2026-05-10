import "./RainNight.css";
export default function RainNight() {
  return (
    <div className="window">
      <div className="rainNightSky">
        <div className="light redLight" />
        <div className="light yellowLight" />
        <div className="light blueLight" />

        <div className="glass glass1" />
        <div className="glass glass2" />
        <div className="glass glass3" />
        <div className="glass glass4" />
        <div className="glass glass5" />
      </div>
    </div>
  );
}