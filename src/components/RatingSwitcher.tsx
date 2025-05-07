import { useRating } from "./RatingContext";

export default function RatingSwitcher({ word }: { word: string }) {
  const { rating } = useRating();

  return rating === "pg" ? <del>{word}</del> : <>{word}</>;
}
