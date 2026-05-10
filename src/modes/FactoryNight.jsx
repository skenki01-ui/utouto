import "./FactoryNight.css";

export default function FactoryNight() {
  return (
    <div className="window">
      <div className="factoryNight">
        <div className="factoryMist" />

        <div className="factoryGlow glowBlue" />
        <div className="factoryGlow glowAmber" />
        <div className="factoryGlow glowRed" />

        <div className="factoryLine line1" />
        <div className="factoryLine line2" />
        <div className="factoryLine line3" />

        <div className="smoke smoke1" />
        <div className="smoke smoke2" />

        <div className="water">
          <div className="reflection reflectionBlue" />
          <div className="reflection reflectionAmber" />
          <div className="reflection reflectionRed" />

          <div className="wave wave1" />
          <div className="wave wave2" />
          <div className="wave wave3" />
        </div>
      </div>
    </div>
  );
}