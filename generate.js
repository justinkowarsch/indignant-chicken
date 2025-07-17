#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

// Parse CLI args
const args = minimist(process.argv.slice(2));
const [command, type, ...rest] = args._;

if (command !== "g" && command !== "generate") {
  console.error('Unknown command. Use: tsr g fn "Post Title"');
  process.exit(1);
}

if (type !== "fn" && type !== "fieldnote" && type !== "field-note") {
  console.error(
    'Unsupported type. Only "fn" (field note) is currently supported.'
  );
  process.exit(1);
}

const title = rest.join(" ").trim();
if (!title) {
  console.error("Please provide a title for the field note.");
  process.exit(1);
}

const today = new Date();
const dateStr = today.toISOString().split("T")[0];
const slugPart = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const filename = `${dateStr}-${slugPart}.mdx`;
const filepath = path.join(__dirname, "blog", filename);

const content = `---
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

fs.writeFileSync(filepath, content);
console.log(`✅ Field note created: blog/${filename}`);
