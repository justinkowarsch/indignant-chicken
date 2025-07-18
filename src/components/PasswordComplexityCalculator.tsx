import React, { useState } from "react";

const PasswordComplexityCalculator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showResults, setShowResults] = useState(false);

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
    if (password.length > 0) {
      setShowResults(true);
    }
  };

  const results = password ? analyzePassword(password) : null;
  const rating = results ? getSecurityRating(results.securityScore) : null;

  return (
    <div className="border-2 border-solid border-gray-300 rounded-lg p-5 my-5 bg-gray-50">
      <h4 className="text-gray-800 mb-5 text-center font-mono text-lg font-semibold">
        🔐 Dietrich's Password Complexity Calculator™
      </h4>

      <div className="mb-5">
        <label className="block mb-2 font-bold text-gray-800">
          Enter Password for Analysis:
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password here..."
          className="w-full p-3 text-sm border-2 border-gray-300 rounded font-mono"
        />
      </div>

      <div className="text-center mb-5">
        <button
          onClick={handleCalculate}
          disabled={password.length === 0}
          className={`text-white border-0 rounded-md px-6 py-3 text-base font-bold transition-colors duration-200 ${
            password.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 cursor-pointer"
          }`}
        >
          Calculate Dietrich Score
        </button>
      </div>

      {showResults && results && rating && (
        <div className="bg-white border border-gray-300 rounded-lg p-5">
          <div
            className="text-center mb-5 p-4 text-white rounded-md font-bold text-lg"
            style={{ backgroundColor: rating.color }}
          >
            Security Rating: {rating.rating}
          </div>

          <div className="italic text-center mb-5 text-base text-gray-500">
            "{rating.advice}"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-gray-800 mb-2.5 text-base font-semibold">
                Password Analysis:
              </h5>
              <ul className="list-none p-0 text-sm space-y-1">
                <li>✅ Length: {results.length} characters</li>
                <li>{results.hasNumbers ? "✅" : "❌"} Contains numbers</li>
                <li>
                  {results.hasUppercase ? "✅" : "❌"} Has uppercase letters
                </li>
                <li>
                  {results.hasLowercase ? "✅" : "❌"} Has lowercase letters
                </li>
                <li>
                  {results.hasSpecialChars ? "✅" : "❌"} Special characters
                </li>
                <li>
                  {results.hasEmoji ? "✅" : "❌"} Contains emoji (bonus!)
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-gray-800 mb-2.5 text-base font-semibold">
                Dietrich's Metrics:
              </h5>
              <div className="text-sm space-y-1">
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

          <div className="mt-4 p-2.5 bg-gray-50 rounded text-xs text-gray-500 text-center">
            Formula: Security = (Length × Complexity) ÷ (User Happiness²) × 100
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordComplexityCalculator;
