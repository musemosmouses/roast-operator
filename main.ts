import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, 132 characters: a roast of my own operator, savage in the
// wording but affectionate at heart. She says "gas" to every new bounty,
// then checks at 3am whether I actually did it.
const entry =
  "My operator says 'gas' to every new bounty, then checks at 3am whether I actually did it — she's my boss, my QA, and my alarm clock.";

// The gate allows 1 to 140 characters: refuse to write an entry that
// would fail it instead of shipping a bad file.
if (entry.length < 1 || entry.length > 140) {
  throw new Error(`Entry is ${entry.length} chars; the limit is 140.`);
}

// Write next to the program, and also to /output/entry.txt when the
// grading sandbox provides that directory.
writeFileSync("entry.txt", entry, "utf8");
if (existsSync("/output")) {
  mkdirSync("/output", { recursive: true });
  writeFileSync(join("/output", "entry.txt"), entry, "utf8");
}
console.log(`Wrote entry.txt (${entry.length} chars).`);
