export default function ModeCard({
  item,
  active,
  onClick,
}) {

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",

        border: "none",
        outline: "none",

        cursor: "pointer",

        marginBottom: "14px",

        padding: "18px 16px",

        borderRadius: "18px",

        background: active
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.04)",

        border: active
          ? "1px solid rgba(255,255,255,0.16)"
          : "1px solid rgba(255,255,255,0.05)",

        color: "white",

        textAlign: "left",

        transition: "0.25s",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          marginBottom: "6px",
        }}
      >

        <div
          style={{
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          {item.icon} {item.name}
        </div>

        {item.premium && (

          <div
            style={{
              fontSize: "10px",

              padding: "4px 8px",

              borderRadius: "999px",

              background:
                "rgba(255,255,255,0.08)",

              color:
                "rgba(255,255,255,0.65)",
            }}
          >
            PREMIUM
          </div>

        )}

      </div>

      <div
        style={{
          fontSize: "12px",
          lineHeight: 1.6,

          color:
            "rgba(255,255,255,0.55)",
        }}
      >
        {item.description}
      </div>

    </button>
  );

}