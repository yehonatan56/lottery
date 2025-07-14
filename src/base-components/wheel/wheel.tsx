import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
const Wheel: React.FC<{ items: string[] }> = ({ items }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [size, setSize] = useState(300);
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    const resize = () =>
      setSize(Math.min(window.innerWidth, window.innerHeight) * 0.8);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      const newColors = items.map(
        () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
      );
      setColors(newColors);
    }
  }, [items]);
  const sliceAngle = 360 / items.length;
  const spin = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * items.length);
    const targetAngle = 360 - index * sliceAngle - sliceAngle / 2;
    const spins = 5;
    const newRotation = spins * 360 + targetAngle;

    setPrizeIndex(index);
    setRotation((prev) => prev + newRotation);
    setSpinning(true);
    setShowPopup(false);

    setTimeout(() => {
      setSpinning(false);
      setShowPopup(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.4 },
        scalar: 1.2,
      });
    }, 4000);
  };
  const generateGradient = () => {
    const step = 360 / items.length;
    let current = 0;
    return colors
      .map((color, i) => {
        const start = current;
        const end = current + step;
        current = end;
        return `${color} ${start}deg ${end}deg`;
      })
      .join(", ");
  };
  return (
    <div style={{ textAlign: "center" }}>
      {colors.length === items.length && (
        <div
          style={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: "50%",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `conic-gradient(${generateGradient()})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s ease-out" : undefined,
              position: "relative",
            }}
          >
            {items.map((item, i) => {
              const angle = sliceAngle * i + sliceAngle / 2;
              const rad = (angle - (rotation % 360)) * (Math.PI / 180);
              const radius = size / 2.6;
              const x = size / 2 + radius * Math.cos(rad);
              const y = size / 2 + radius * Math.sin(rad);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: y,
                    left: x,
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* חץ עליון */}
          <div
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "20px solid red",
              zIndex: 3,
            }}
          />
        </div>
      )}

      <button
        onClick={spin}
        disabled={spinning}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
        }}
      >
        {spinning ? "סובב..." : "סובב!"}
      </button>

      {/* פופאפ זוכה */}
      {showPopup && prizeIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: "30px 50px",
              textAlign: "center",
              boxShadow: "0 0 30px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ fontSize: 28, marginBottom: 10 }}>🎉 המנצח הוא 🎉</h2>
            <p style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
              {items[prizeIndex]}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                fontSize: 16,
                borderRadius: 10,
              }}
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Wheel;
