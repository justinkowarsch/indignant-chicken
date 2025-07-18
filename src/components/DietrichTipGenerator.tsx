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
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNewTip = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);

    // Fade out current tip
    setTimeout(() => {
      // Change tip after fade out
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);

      // Fade in new tip after a brief pause
      setTimeout(() => {
        setIsAnimating(false);
      }, 150); // Brief pause then fade in
    }, 200); // Fade out duration
  };

  return (
    <div className="border-2 border-solid border-gray-300 dark:border-gray-600 rounded-lg p-5 my-5 bg-gray-50 dark:bg-gray-800">
      <h4 className="text-gray-800 dark:text-gray-100 mb-4 text-center text-lg font-semibold">
        💡 Daily Security Wisdom from Dietrich
      </h4>

      <div
        className={`italic text-base leading-relaxed mb-4 min-h-[50px] flex items-center justify-center text-center text-gray-700 dark:text-gray-300 transition-all duration-200 ${
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        "{currentTip}"
      </div>

      <div className="text-center">
        <button
          onClick={generateNewTip}
          disabled={isAnimating}
          className={`text-white border-0 rounded px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
            isAnimating
              ? "bg-gray-400 cursor-not-allowed scale-95"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer hover:scale-105"
          }`}
        >
          {isAnimating ? "🤔 Thinking..." : "Get New Wisdom"}
        </button>
      </div>
    </div>
  );
};

export default DietrichTipGenerator;
