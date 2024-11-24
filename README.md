# Test runners with test isolation

- Typescript
- Single source file
- 1000 tests
- Biased conditions only, make sure you know how each test runner works internally 😇
- Test isolation
- Cold runs only
- Preparation command before each run: `rm -rf node_modules/; pnpm i`

| Test runner | Time    | Runtime version                         |
| ----------- | ------- | --------------------------------------- |
| `jest`      | 38.738s | Node `v22.0` to match Vitest            |
| `vitest`    | 19.128s | Node `v22.0` due to nodejs/node#54735   |
| `node:test` | 42.567s | Node `v22.11` due to experimental flags |
| `deno test` | 10.466s | `v2.1.1`                                |

Bun, Mocha and similar non-isolated test runners fail these test cases:

```sh
# No isolation available, same with Mocha
$ bun test ./jest/**

...

jest/example-696.test.ts:
1 | export function sum(a: number, b: number): number {
2 |   if (globalThis.CHECK_IF_ISOLATED) {
3 |     throw new Error("Test case was not isolated");
              ^
error: Test case was not isolated
      at sum (/x/jest-vs-node-vs-vitest/src/sum.ts:3:11)
      at /x/jest-vs-node-vs-vitest/jest/example-696.test.ts:6:10
✗ fixture [0.09ms]

 1 pass
 999 fail
 1 expect() calls
Ran 1000 tests across 1000 files. [556.00ms]
```
