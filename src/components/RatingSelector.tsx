import { useRating } from "./RatingContext";

export default function RatingSelector() {
  const { rating, setRating } = useRating();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <strong>Language Setting:</strong>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "0.5rem",
          gap: "0.5rem",
        }}
      >
        <label title="For those moments when life demands full-throated honesty and a few well-placed f-bombs.">
          <input
            type="radio"
            checked={rating === "explicit"}
            onChange={() => setRating("explicit")}
          />{" "}
          Explicit (a.k.a. grown-up mode)
        </label>
        <label title="Not censored, just sheepishly ~struck through~ so we can all pretend it wasn’t there.">
          <input
            type="radio"
            checked={rating === "pg"}
            onChange={() => setRating("pg")}
          />{" "}
          PG (for people who like their profanity... lightly disguised)
        </label>
      </div>
    </div>
  );
}
