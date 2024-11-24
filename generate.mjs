import { mkdirSync, rmSync, writeFileSync } from "node:fs";

const TEST_FILE_COUNT = 1000;

for (const directory of ["node", "jest", "vitest", "deno"]) {
  rmSync(directory, { recursive: true, force: true });
  mkdirSync(directory);
}

for (const _index of Array.from({ length: TEST_FILE_COUNT }).fill().keys()) {
  const index = 1 + _index;

  writeFileSync(`./vitest/example-${index}.test.ts`, vitestTemplate(), "utf-8");
  writeFileSync(`./jest/example-${index}.test.ts`, jestTemplate(), "utf-8");
  writeFileSync(`./node/example-${index}.test.ts`, nodeTemplate(), "utf-8");
  writeFileSync(`./deno/example-${index}.test.ts`, denoTemplate(), "utf-8");
}

function vitestTemplate() {
  return `// Generated
import { expect, test } from 'vitest'
import { sum } from '../src/sum';

test('fixture', () => {
  expect(sum(123, 321)).toBe(444);
})
`;
}

function jestTemplate() {
  return `// Generated
import { expect, test } from "@jest/globals";
import { sum } from '../src/sum';

test('fixture', () => {
  expect(sum(123, 321)).toBe(444);
})
`;
}

function nodeTemplate() {
  return `// Generated
import assert from 'node:assert/strict';
import test from 'node:test';
import { sum } from '../src/sum.ts';

test('fixture', () => {
  assert.strictEqual(sum(123, 321), 444);
})
`;
}

function denoTemplate() {
  return `// Generated
import { expect } from "jsr:@std/expect";
import { sum } from '../src/sum.ts';

Deno.test("add function adds two numbers correctly", () => {
  expect(sum(123, 321)).toBe(444);
});
`;
}
