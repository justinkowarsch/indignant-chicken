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
    <div
      style={{
        border: "2px solid #34495e",
        borderRadius: "10px",
        padding: "25px",
        margin: "20px 0",
        backgroundColor: "#ecf0f1",
      }}
    >
      <h4
        style={{
          color: "#2c3e50",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "monospace",
        }}
      >
        🔐 Dietrich's Password Complexity Calculator™
      </h4>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          Enter Password for Analysis:
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password here..."
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            border: "2px solid #bdc3c7",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={handleCalculate}
          disabled={password.length === 0}
          style={{
            backgroundColor: password.length === 0 ? "#95a5a6" : "#34495e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "12px 24px",
            cursor: password.length === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Calculate Dietrich Score
        </button>
      </div>

      {showResults && results && rating && (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #bdc3c7",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: rating.color,
              color: "white",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Security Rating: {rating.rating}
          </div>

          <div
            style={{
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "16px",
              color: "#7f8c8d",
            }}
          >
            "{rating.advice}"
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <h5 style={{ color: "#2c3e50", marginBottom: "10px" }}>
                Password Analysis:
              </h5>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "14px" }}>
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
              <h5 style={{ color: "#2c3e50", marginBottom: "10px" }}>
                Dietrich's Metrics:
              </h5>
              <div style={{ fontSize: "14px" }}>
                <div style={{ marginBottom: "5px" }}>
                  <strong>Complexity Factor:</strong> {results.complexityFactor}
                </div>
                <div style={{ marginBottom: "5px" }}>
                  <strong>User Happiness:</strong> {results.userHappiness}%
                </div>
                <div style={{ marginBottom: "5px" }}>
                  <strong>Security Score:</strong> {results.securityScore}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#6c757d",
              textAlign: "center",
            }}
          >
            Formula: Security = (Length × Complexity) ÷ (User Happiness²) × 100
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordComplexityCalculator;
