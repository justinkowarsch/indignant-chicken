import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type Rating = "explicit" | "pg";

const RatingContext = createContext<{
  rating: Rating;
  setRating: (rating: Rating) => void;
}>({
  rating: "pg",
  setRating: () => {},
});

export function RatingProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [rating, setRating] = useState<Rating>("pg");
  const contextValue = useMemo(
    () => ({ rating, setRating }),
    [rating, setRating]
  );

  return (
    <RatingContext.Provider value={contextValue}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRating() {
  return useContext(RatingContext);
}
