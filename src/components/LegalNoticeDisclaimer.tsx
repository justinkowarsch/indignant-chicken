// src/components/LegalNoticeDisclaimer.tsx
// This is the styled “details” that Docusaurus uses in MDX:
import Details from "@theme/Details";
import { JSX } from "react";

export default function LegalNoticeDisclaimer(): JSX.Element {
  return (
    <Details summary="LEGAL NOTICE AND DISCLAIMER">
      <img
        src="/img/sludge_honorable_no_bg.png"
        alt="Sludge, Esq."
        style={{
          float: "left",
          width: "125px",
          display: "block",
          margin: "0 0 0 0",
        }}
      />
      <p>
        Be it known to all readers, prospective litigants, and weary HR drones
        that all personally identifying particulars—including but not limited to
        any true names, precise dates, job titles, salary ranges, or corporate
        pseudonyms suspiciously similar to actual organizations—have been
        judiciously expunged from these illustrative narratives. This redaction
        serves the dual purpose of (a) safeguarding the aforementioned
        innocents, and (b) shielding yours truly from frivolous lawsuits,
        needless performance improvement plans, and impromptu “we need to talk”
        meetings that could easily inspire an entire future blog post.
      </p>

      <p>
        Should any perspicacious sleuth discern veritable correlations to
        real‑world events, such recognition is hereby declared purely
        fortuitous, coincidental, and entirely divorced from fact. All
        scenarios, characters, and dialogues contained herein are offered as
        hypothetical constructs, presented “as is,” without warranty of reality,
        veracity, or immunity from HR retribution. Any resemblance to actual
        persons—living, departed, or reluctantly employed—is strictly the result
        of the reader’s fertile imagination and in no way a matter of record,
        precedent, or admissible evidence.
      </p>
      <p>
        Proceed at your own risk, and remember: curiosity may have killed the
        cat, but it will not indemnify you against mandatory sensitivity
        training.
      </p>
    </Details>
  );
}
