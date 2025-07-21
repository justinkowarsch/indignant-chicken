// src/components/LegalNoticeDisclaimer.tsx
// This is the styled "details" that Docusaurus uses in MDX:
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
        that all scenarios, characters, dialogues, and corporate malfeasance
        contained herein are purely hypothetical constructs, presented "as is,"
        without warranty of reality, veracity, or immunity from HR retribution.
        Any resemblance to actual persons—living, departed, or reluctantly
        employed—or to specific organizations, subsidiaries, holding companies,
        meetings, conference rooms, email domains, job titles, salary ranges,
        organizational hierarchies, corporate buzzwords, team-building
        exercises, quarterly objectives, performance metrics, bathroom
        conversations, water cooler gossip, Slack channels, shared drives,
        expense reports, parking assignments, cafeteria seating arrangements, or
        interdepartmental feuds is strictly the result of the reader's fertile
        imagination and in no way a matter of record, precedent, or admissible
        evidence.
      </p>
      <p>
        Should any perspicacious sleuth discern veritable correlations to
        real-world events, such recognition is hereby declared purely
        fortuitous, coincidental, and entirely divorced from fact. This
        disclaimer serves the dual purpose of (a) shielding yours truly from
        frivolous lawsuits, needless performance improvement plans, and
        impromptu"we need to talk" meetings that could easily inspire an entire
        future blog post, and (b) maintaining plausible deniability for all
        parties involved.
      </p>
      <p>
        Reader discretion is advised. The author assumes no liability for
        occupational hazards incurred through excessive pattern recognition.
      </p>
    </Details>
  );
}
