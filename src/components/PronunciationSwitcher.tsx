import { useState } from "react";

type PronunciationSwitcherProps = {
  word: string;
  phonetic: string;
  ipa: string;
};

export default function PronunciationSwitcher({
  word,
  phonetic,
  ipa,
}: PronunciationSwitcherProps) {
  const [mode, setMode] = useState<"phonetic" | "ipa">("phonetic");

  return (
    <div style={{ margin: "1rem 0" }}>
      <strong>{word}</strong>:{" "}
      {mode === "phonetic" ? (
        <>
          <span title="Like... how a normal person might say it.">
            [ {phonetic} ]
          </span>{" "}
          <em>Phonetic (Standard)</em>
        </>
      ) : (
        <>
          <span title="For the linguists and people who correct your pronunciation at parties.">
            / {ipa} /
          </span>{" "}
          <em>IPA</em>
        </>
      )}
      <div style={{ marginTop: "0.5rem", fontSize: "0.9em" }}>
        <label title="You know, just say it how it sounds.">
          <input
            type="radio"
            checked={mode === "phonetic"}
            onChange={() => setMode("phonetic")}
          />{" "}
          Phonetic (aka: human-friendly)
        </label>{" "}
        <label title="International Phonetic Alphabet — the secret code of smartypants.">
          <input
            type="radio"
            checked={mode === "ipa"}
            onChange={() => setMode("ipa")}
          />{" "}
          IPA (for when you want to look clever)
        </label>
      </div>
    </div>
  );
}
