import React, { useState } from "react";

const DietrichTipGenerator: React.FC = () => {
  const tips = [
    "Remember: If you can pronounce your password, it's not secure enough.",
    "Pro tip: Change your password mid-sentence for optimal security.",
    "A good password should make you question your life choices.",
    "If logging in doesn't require at least 3 devices, you're doing it wrong.",
    "Session timeouts build character. Embrace the interruption.",
    "Two-factor authentication is just the beginning. I'm working on seventeen-factor.",
    "Your password should be so complex that even you forget it immediately.",
    "Security question answers should be lies. Truth is a vulnerability.",
    "If you're not frustrated by our security measures, they're not working.",
    "CAPTCHAs should require a master's degree in pattern recognition.",
    "Password managers are for the weak. Real professionals memorize everything.",
    "The best authentication requires interpreting ancient hieroglyphs.",
  ];

  const [currentTip, setCurrentTip] = useState(tips[0]);

  const generateNewTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        margin: "20px 0",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h4
        style={{
          color: "#2c3e50",
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        💡 Daily Security Wisdom from Dietrich
      </h4>

      <div
        style={{
          fontStyle: "italic",
          fontSize: "16px",
          lineHeight: "1.5",
          marginBottom: "15px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        "{currentTip}"
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={generateNewTip}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#2980b9")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#3498db")
          }
        >
          Get New Wisdom
        </button>
      </div>
    </div>
  );
};

export default DietrichTipGenerator;
