import React, { useState } from "react";

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      console.log("❌ No email provided");
      setStatus("error");
      return;
    }

    console.log("📧 Email signup attempt:", {
      email,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 50) + "...",
    });

    setStatus("loading");

    // Simulate API call delay
    setTimeout(() => {
      console.log('✅ Email successfully "saved" to console database:', email);
      console.log(
        "📊 Current subscribers in console DB:",
        Math.floor(Math.random() * 500) + 100 // Random fake count
      );
      setStatus("success");

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setStatus("idle");
        console.log("🔄 Form reset to idle state");
      }, 3000);
    }, 1500);
  };

  const getStatusMessage = () => {
    switch (status) {
      case "loading":
        return "Preparing your digital shackles...";
      case "success":
        return "Welcome to the Sludge! Ernest approves. 🔐";
      case "error":
        return "Error: Even our signup form has authentication issues.";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "loading":
        return "Encrypting...";
      case "success":
        return "Subscribed!";
      default:
        return "Subscribe";
    }
  };

  return (
    <div className="border-2 border-gray-600 rounded-lg p-6 my-5 bg-gray-100 text-center">
      <h3 className="text-gray-800 mb-4 text-xl">
        📬 Get Notified When Ernest Strikes Again!
      </h3>

      <p className="text-gray-500 mb-5 text-sm italic">
        Join the resistance. Get alerts when new corporate nightmares are
        documented.
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log("📝 Email input changed:", e.target.value);
            }}
            placeholder="your.email@corporate-overlords.com"
            disabled={status === "loading"}
            className={`flex-1 p-3 text-sm border-2 border-gray-300 rounded-md outline-none transition-opacity ${
              status === "loading" ? "opacity-70" : "opacity-100"
            }`}
            onFocus={() => console.log("🎯 Email input focused")}
            onBlur={() => console.log("👋 Email input blurred")}
          />

          <button
            type="submit"
            disabled={status === "loading" || !email}
            className={`px-4 py-3 text-sm font-bold text-white border-0 rounded-md transition-all duration-300 min-w-[120px] ${
              status === "success"
                ? "bg-green-600"
                : status === "loading"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600"
            } ${
              status === "loading" || !email
                ? "cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </form>

      {status !== "idle" && (
        <div
          className={`p-2.5 rounded-md text-sm border ${
            status === "success"
              ? "bg-green-100 text-green-600 border-green-600"
              : status === "error"
              ? "bg-red-100 text-red-600 border-red-600"
              : "bg-gray-50 text-gray-500 border-gray-300"
          }`}
        >
          {getStatusMessage()}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        No spam, just pure corporate suffering. Unsubscribe anytime (if you can
        find the button).
      </div>
    </div>
  );
};

export default EmailSignup;
