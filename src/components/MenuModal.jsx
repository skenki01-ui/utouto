import "../App.css";

import modeList from "../data/modeList";

import ModeCard from "./ModeCard.jsx";

export default function MenuModal({
  mode,
  setMode,
  setMenuOpen,
  sleepTimer,
  setSleepTimer,
}) {

  const timerOptions = [
    {
      label: "∞",
      value: 0,
    },
    {
      label: "15m",
      value: 1000 * 60 * 15,
    },
    {
      label: "30m",
      value: 1000 * 60 * 30,
    },
  ];

  return (
    <div
      onClick={() => setMenuOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.45)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter:
          "blur(10px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        overflowY: "auto",
        WebkitOverflowScrolling:
          "touch",
        padding: "20px 0",
        boxSizing: "border-box",
      }}
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "82%",
          maxWidth: "340px",
          minHeight: "100%",
          background:
            "linear-gradient(to bottom, rgba(18,22,38,0.96), rgba(8,10,18,0.98))",
          borderLeft:
            "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "-10px 0 40px rgba(0,0,0,0.45)",
          padding:
            "28px 18px 120px",
          boxSizing: "border-box",
          overflowY: "auto",
          WebkitOverflowScrolling:
            "touch",
        }}
      >

        <div
          style={{
            color:
              "rgba(255,255,255,0.9)",
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "26px",
            letterSpacing: "0.08em",
          }}
        >
          うとうと
        </div>

        <div
          style={{
            color:
              "rgba(255,255,255,0.45)",
            fontSize: "12px",
            marginBottom: "12px",
            letterSpacing: "0.08em",
          }}
        >
          TIMER
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "28px",
          }}
        >

          {timerOptions.map((item) => (

            <button
              key={item.label}
              onClick={() =>
                setSleepTimer(item.value)
              }
              style={{
                flex: 1,
                border: "none",
                borderRadius: "999px",
                padding: "10px 0",
                background:
                  sleepTimer === item.value
                    ? "rgba(255,255,255,0.16)"
                    : "rgba(255,255,255,0.06)",
                color: "white",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>

          ))}

        </div>

        <div
          style={{
            color:
              "rgba(255,255,255,0.45)",
            fontSize: "12px",
            marginBottom: "18px",
            letterSpacing: "0.08em",
          }}
        >
          MODE
        </div>

        {modeList.map((item) => (

          <ModeCard
            key={item.id}
            item={item}
            active={
              mode === item.id
            }
            onClick={() => {

              setMode(item.id);

              setMenuOpen(false);

            }}
          />

        ))}

        <button
          onClick={() =>
            setMenuOpen(false)
          }
          style={{
            width: "100%",
            marginTop: "28px",
            border: "none",
            cursor: "pointer",
            borderRadius: "18px",
            padding: "16px",
            background:
              "rgba(255,255,255,0.06)",
            color:
              "rgba(255,255,255,0.82)",
            fontSize: "14px",
          }}
        >
          閉じる
        </button>

      </div>

    </div>
  );

}