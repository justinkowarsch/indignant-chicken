// src/theme/Root.tsx
import { RatingProvider } from "@site/src/components/RatingContext";
import OriginalRoot from "@theme-original/Root";

export default function Root({ children }) {
  return (
    <RatingProvider>
      <OriginalRoot>{children}</OriginalRoot>
    </RatingProvider>
  );
}
