// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry itself is a YouTube video: this program only hands the grader
// the video's address. It reads VIDEO.json from the repository root and
// writes an identical copy to the output directory, where the gate reads it.
// The house then reads the video's views itself through the YouTube Data API;
// nothing written here influences the score.
//
// NOTE: until the clip is posted on YouTube, VIDEO.json holds the placeholder
// address {"url": "https://www.youtube.com/shorts/<id>"}. This program copies
// it unchanged; the gate refuses a placeholder at intake, which is expected
// until the real video address replaces it.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// On success it prints nothing and out/VIDEO.json is byte-identical to
// this repository's VIDEO.json.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'VIDEO.json');
const TARGET = join(OUTPUT_DIR, 'VIDEO.json');

function fail(message: string): never {
  console.error(`gta6-clipper-01: ${message}`);
  process.exit(1);
}

if (!existsSync(SOURCE)) {
  fail(`VIDEO.json not found in ${BOT_DIR}`);
}

let raw: Buffer;
try {
  raw = readFileSync(SOURCE);
} catch (err) {
  fail(`could not read VIDEO.json: ${(err as Error).message}`);
}

// The file must be a JSON object naming a video address. A placeholder
// address is copied as-is (the gate, not this program, refuses it); only a
// malformed file or a missing/empty url is an error here.
let parsed: unknown;
try {
  parsed = JSON.parse(raw!.toString('utf-8'));
} catch {
  fail('VIDEO.json is not valid JSON');
}

if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string' ||
  (parsed as { url: string }).url.length === 0
) {
  fail('VIDEO.json must be an object with a non-empty string "url"');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  writeFileSync(TARGET, raw!);
} catch (err) {
  fail(`could not write ${TARGET}: ${(err as Error).message}`);
}

// Read the copy back and confirm it is byte-identical to the source, so a
// half-written output can never reach the gate silently.
if (!readFileSync(TARGET).equals(raw!)) {
  fail(`${TARGET} differs from ${SOURCE} after copying`);
}
