import React, { useState } from "react";

const PasswordComplexityCalculator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCheckmarks, setShowCheckmarks] = useState<boolean[]>([]);

  const analyzePassword = (pwd: string) => {
    const length = pwd.length;
    const hasNumbers = /\d/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    const hasEmoji =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(
        pwd
      );

    // Dietrich's ridiculous complexity calculations
    const complexityFactor =
      (hasNumbers ? 2.7 : 0) +
      (hasUppercase ? 1.3 : 0) +
      (hasLowercase ? 0.8 : 0) +
      (hasSpecialChars ? 4.2 : 0) +
      (hasEmoji ? 15.7 : 0) +
      (length > 12 ? length * 1.1 : 0);

    // User happiness decreases with complexity (Dietrich's favorite metric)
    const userHappiness = Math.max(
      1,
      100 - complexityFactor * 3.2 - length * 2.1
    );

    // Final security score using Dietrich's formula
    const securityScore =
      ((length * complexityFactor) / (userHappiness * userHappiness)) * 100;

    return {
      length,
      complexityFactor: Math.round(complexityFactor * 100) / 100,
      userHappiness: Math.round(userHappiness * 100) / 100,
      securityScore: Math.round(securityScore * 100) / 100,
      hasNumbers,
      hasUppercase,
      hasLowercase,
      hasSpecialChars,
      hasEmoji,
    };
  };

  const getSecurityRating = (score: number) => {
    if (score < 10)
      return {
        rating: "Dangerously Insecure",
        color: "#e74c3c",
        advice: "Even Dietrich is disappointed.",
      };
    if (score < 50)
      return {
        rating: "Barely Acceptable",
        color: "#f39c12",
        advice: "Dietrich sighs heavily at your effort.",
      };
    if (score < 150)
      return {
        rating: "Moderately Frustrating",
        color: "#f1c40f",
        advice: "You're starting to understand suffering.",
      };
    if (score < 300)
      return {
        rating: "Adequately Torturous",
        color: "#27ae60",
        advice: "Dietrich nods approvingly.",
      };
    if (score < 500)
      return {
        rating: "Beautifully Hostile",
        color: "#2980b9",
        advice: "Your coworkers will curse your name.",
      };
    return {
      rating: "Transcendently Impossible",
      color: "#8e44ad",
      advice: "Dietrich sheds a single tear of pride.",
    };
  };

  const handleCalculate = () => {
    if (password.length > 0 && !isCalculating) {
      setIsCalculating(true);
      setShowResults(false);
      setShowRating(false);
      setShowAdvice(false);
      setShowAnalysis(false);
      setShowCheckmarks([]);

      // Simulate calculation time and create staggered reveal
      setTimeout(() => {
        setShowResults(true);
        setIsCalculating(false);

        // Staggered entrance animations
        setTimeout(() => setShowRating(true), 150);
        setTimeout(() => setShowAdvice(true), 300);
        setTimeout(() => {
          setShowAnalysis(true);
          // Staggered checkmark reveals
          const checkmarkTimers = [0, 100, 200, 300, 400, 500];
          checkmarkTimers.forEach((delay, index) => {
            setTimeout(() => {
              setShowCheckmarks((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, delay + 200);
          });
        }, 450);
      }, 800); // Short delay for "calculation"
    }
  };

  const results = password ? analyzePassword(password) : null;
  const rating = results ? getSecurityRating(results.securityScore) : null;

  return (
    <div className="border-2 border-solid border-gray-300 dark:border-gray-600 rounded-lg p-5 my-5 bg-gray-50 dark:bg-gray-800">
      <h4 className="text-gray-800 dark:text-gray-100 mb-5 text-center font-mono text-lg font-semibold">
        🔐 Dietrich's Password Complexity Calculator™
      </h4>

      <div className="mb-5">
        <label className="block mb-2 font-bold text-gray-800 dark:text-gray-200">
          Enter Password for Analysis:
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password here..."
          className={`w-full p-3 text-sm border-2 rounded font-mono transition-all duration-500 transform ${
            password.length === 0
              ? "border-gray-300 focus:border-blue-400 focus:scale-[1.02] focus:shadow-lg"
              : results && results.securityScore < 50
              ? "border-red-400 focus:border-red-500 shadow-red-100 shadow-lg animate-pulse border-red-500"
              : results && results.securityScore < 200
              ? "border-yellow-400 focus:border-yellow-500 shadow-yellow-100 shadow-lg focus:scale-[1.01]"
              : "border-green-400 focus:border-green-500 shadow-green-100 shadow-lg focus:scale-[1.01] focus:shadow-green-200"
          } ${
            password.length > 0 && results
              ? results.securityScore < 50
                ? "ring-2 ring-red-200 ring-opacity-50"
                : results.securityScore < 200
                ? "ring-2 ring-yellow-200 ring-opacity-50"
                : "ring-2 ring-green-200 ring-opacity-50"
              : ""
          }`}
        />
      </div>

      <div className="text-center mb-5">
        <button
          onClick={handleCalculate}
          disabled={password.length === 0 || isCalculating}
          className={`text-white border-0 rounded-md px-6 py-3 text-base font-bold transition-all duration-300 ${
            password.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : isCalculating
              ? "bg-blue-500 cursor-not-allowed scale-95 animate-pulse"
              : "bg-gray-600 hover:bg-gray-700 cursor-pointer hover:scale-105"
          }`}
        >
          {isCalculating ? "🧮 Calculating..." : "Calculate Dietrich Score"}
        </button>
      </div>

      {showResults && results && rating && (
        <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-5 animate-in slide-in-from-bottom-4 duration-500 fade-in">
          <div
            className={`text-center mb-5 p-4 text-white rounded-md font-bold text-lg transition-all duration-500 ${
              showRating
                ? "animate-in zoom-in-95 fade-in duration-300"
                : "opacity-0 scale-95"
            }`}
            style={{ backgroundColor: rating.color }}
          >
            Security Rating: {rating.rating}
          </div>

          <div
            className={`italic text-center mb-5 text-base text-gray-500 dark:text-gray-400 transition-all duration-500 ${
              showAdvice
                ? "animate-in slide-in-from-left-4 fade-in duration-400"
                : "opacity-0 translate-x-4"
            }`}
          >
            "{rating.advice}"
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ${
              showAnalysis
                ? "animate-in slide-in-from-bottom-2 fade-in duration-600"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div>
              <h5 className="text-gray-800 dark:text-gray-200 mb-2.5 text-base font-semibold">
                Password Analysis:
              </h5>
              <ul className="list-none p-0 text-sm space-y-1 text-gray-800 dark:text-gray-300">
                <li
                  className={`transition-all duration-300 ${
                    showCheckmarks[0]
                      ? "animate-in slide-in-from-left-2 fade-in"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  ✅ Length: {results.length} characters
                </li>
                <li
                  className={`transition-all duration-300 ${
                    showCheckmarks[1]
                      ? "animate-in slide-in-from-left-2 fade-in"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {results.hasNumbers ? "✅" : "❌"} Contains numbers
                </li>
                <li
                  className={`transition-all duration-300 ${
                    showCheckmarks[2]
                      ? "animate-in slide-in-from-left-2 fade-in"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {results.hasUppercase ? "✅" : "❌"} Has uppercase letters
                </li>
                <li
                  className={`transition-all duration-300 ${
                    showCheckmarks[3]
                      ? "animate-in slide-in-from-left-2 fade-in"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {results.hasLowercase ? "✅" : "❌"} Has lowercase letters
                </li>
                <li
                  className={`transition-all duration-300 ${
                    showCheckmarks[4]
                      ? "animate-in slide-in-from-left-2 fade-in"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {results.hasSpecialChars ? "✅" : "❌"} Special characters
                </li>
                <li
                  className={`transition-all duration-300 ${
                    showCheckmarks[5]
                      ? "animate-in slide-in-from-left-2 fade-in"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {results.hasEmoji ? "✅" : "❌"} Contains emoji (bonus!)
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-gray-800 dark:text-gray-200 mb-2.5 text-base font-semibold">
                Dietrich's Metrics:
              </h5>
              <div className="text-sm space-y-1 text-gray-800 dark:text-gray-300">
                <div>
                  <strong>Complexity Factor:</strong> {results.complexityFactor}
                </div>
                <div>
                  <strong>User Happiness:</strong> {results.userHappiness}%
                </div>
                <div>
                  <strong>Security Score:</strong> {results.securityScore}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-gray-50 dark:bg-gray-600 rounded text-xs text-gray-500 dark:text-gray-400 text-center">
            Formula: Security = (Length × Complexity) ÷ (User Happiness²) × 100
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordComplexityCalculator;
