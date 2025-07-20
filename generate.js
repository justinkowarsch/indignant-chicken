#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

// Parse CLI args
const args = minimist(process.argv.slice(2));
const [command, type, ...rest] = args._;

// Show help
if (
  args.help ||
  args.h ||
  command === "help" ||
  command === "-h" ||
  command === "--help"
) {
  console.log(`
📝 theSludge.report Content Generator

USAGE:
  npm run tsr g <type> "Title"
  npm run tsr generate <type> "Title"

TYPES:
  fn, field-note, fieldnote    Create a field note
  cs, case-study, casestudy    Create a case study

EXAMPLES:
  npm run tsr g fn "My Field Note"
  npm run tsr g cs "Epic Corporate Fail"

OPTIONS:
  -h, --help                   Show this help message

The generator creates draft posts with proper frontmatter and scaffolding.
Remember to set 'draft: false' when ready to publish!
`);
  process.exit(0);
}

if (command !== "g" && command !== "generate") {
  console.error(
    'Unknown command. Use: tsr g fn "Post Title" or tsr g cs "Case Study Title"'
  );
  console.error('Run "npm run tsr help" for more information.');
  process.exit(1);
}

const isFieldNote =
  type === "fn" || type === "fieldnote" || type === "field-note";
const isCaseStudy =
  type === "cs" || type === "case-study" || type === "casestudy";

if (!isFieldNote && !isCaseStudy) {
  console.error(
    'Unsupported type. Use "fn" (field note) or "cs" (case study).'
  );
  process.exit(1);
}

const title = rest.join(" ").trim();
if (!title) {
  const postType = isFieldNote ? "field note" : "case study";
  console.error(`Please provide a title for the ${postType}.`);
  process.exit(1);
}

const today = new Date();
const dateStr = today.toISOString().split("T")[0];
const slugPart = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-)|(-$)/g, "");

const filename = `${dateStr}-${slugPart}.mdx`;
const subdir = isFieldNote ? "field_notes" : "case_studies";
const filepath = path.join(__dirname, "blog", subdir, filename);

let content;

if (isFieldNote) {
  content = `---
title: "${title}"
slug: /field-notes/${slugPart}
tags: [fn]
date: ${dateStr}
authors: [es]
draft: true
---

<!-- Start writing preview here... -->

<!-- truncate -->

<!-- Start writing main here... -->
`;
} else {
  // Case Study template
  content = `---
slug: /case-study/${slugPart}
title: Case Study - ${title}
authors: [es]
date: ${dateStr}
tags: [cs]
draft: true
---

import RatingSelector from "@site/src/components/RatingSelector";
import RatingSwitcher from "@site/src/components/RatingSwitcher";
import LegalNoticeDisclaimer from "@site/src/components/LegalNoticeDisclaimer";

[Opening hook - your compelling first line that draws readers in]

<!-- truncate -->

:::warning

This post might be a bit much for sensitive ears.

<RatingSelector />

<RatingSwitcher word="[Expletive]" /> happens when dealing with corporate bureaucracy.

:::

## The Setup

[Describe the initial situation or context that led to this case study]

:::info[Context Box]

[Any relevant background information, quotes, or key details that set the stage]

:::

## The Problem

[Detail the core issue or challenge that emerged]

:::note

[Side note or observation about the situation]

:::

## The Plot Thickens

[Describe how the situation evolved or got more complicated]

:::danger[error]

[Any error messages, roadblocks, or frustrating moments]

:::

## The Resolution (Or Lack Thereof)

[How things played out - whether it was resolved, made worse, or left hanging]

## Key Takeaways

[What lessons can be drawn from this experience]

- **Lesson 1**: [Key insight]
- **Lesson 2**: [Another insight] 
- **Lesson 3**: [Final insight]

## Footnotes

<small id="footnote1">
  <sup>1</sup> [If you need footnotes, add them here with proper linking]
</small>

<LegalNoticeDisclaimer />
`;
}

fs.writeFileSync(filepath, content);
const postType = isFieldNote ? "Field note" : "Case study";
console.log(`✅ ${postType} created: blog/${subdir}/${filename}`);
