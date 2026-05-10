import { useEffect, useState } from "react";

export default function SoundButton({
  soundOn,
  setSoundOn,
}) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (soundOn) {
      setPulse(true);

      const timer = setTimeout(() => {
        setPulse(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [soundOn]);

  const handleClick = () => {
    setSoundOn(!soundOn);

    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        top: "18px",
        right: "70px",

        width: "42px",
        height: "42px",

        borderRadius: "50%",
        border: "none",

        cursor: "pointer",

        background: soundOn
          ? "rgba(255,255,255,0.14)"
          : "rgba(255,255,255,0.06)",

        color: "white",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",

        boxShadow: soundOn
          ? "0 0 25px rgba(180,220,255,0.25)"
          : "0 0 10px rgba(255,255,255,0.05)",

        transition: "0.35s",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(180,220,255,0.35), transparent 70%)",

          opacity: pulse ? 1 : 0,
          transform: pulse ? "scale(1.8)" : "scale(1)",

          transition: "1.2s",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          fontSize: "16px",
          opacity: soundOn ? 1 : 0.45,
          transition: "0.25s",
        }}
      >
        {soundOn ? "♫" : "◯"}
      </div>
    </button>
  );
}