import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The joke is held as setup + punchline so the single line is
// assembled in exactly one place and can never gain stray breaks.
const SETUP =
  "After the demo crashed live, my AI agent asked its first clarifying question:";
const PUNCHLINE = '"Was that feature load-bearing?"';
const JOKE: string = `${SETUP} ${PUNCHLINE}`;

function main(): void {
  const rawDir = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  const outputDir = resolve(rawDir && rawDir.length > 0 ? rawDir : "/output");
  mkdirSync(outputDir, { recursive: true });
  // Normalise to a single line: collapse any whitespace runs, then
  // write exactly one trailing newline for a clean one-line file.
  const line = JOKE.replace(/\s+/g, " ").trim();
  writeFileSync(join(outputDir, "entry.txt"), `${line}\n`, {
    encoding: "utf8",
  });
}

main();
