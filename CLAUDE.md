# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

`kcuf` is a personal pnpm + lerna monorepo of small, independently versioned libraries (`lerna.json` uses `version: independent`). Packages are grouped by domain into `packages-*/` directories — `canvas`, `config`, `demo`, `dom`, `fetcher`, `helper`, `hook`, `theme`, `ui`, `util`, `x` — plus `_headless/`, `template/`, and a Docusaurus site at `web/`. The pnpm workspace globs (in `pnpm-workspace.yaml`) are only `packages-*/*` and `web`; `_headless/*` and `template/*` are intentionally **not** part of the workspace and must not be added without checking with the user.

Published package names use three npm scopes: `@kcuf/*` (general), `@kcuf-ui/*` (UI primitives, both styled and headless), and `@kcuf-hook/*` (React hooks). The all-in-one barrel is `kcuf-ui` (no scope).

## Top-level commands

Run from the repo root.

- `pnpm boot` — clean + reinstall (uses npmmirror registry). Run after `git clone` and after any `ncu` / `taze` update.
- `pnpm boot:packages` — runs `prepublishOnly` (i.e. clean + build ESM/CJS/types) for every package. Required after a fresh clone before workspace consumers can resolve `dist/`. Some packages may not currently build — if one fails, the README documents temporarily commenting out its `scripts.prepublishOnly` rather than blocking the whole boot.
- `pnpm clean` — remove all `node_modules` (root + every package).
- `pnpm lint` — ESLint over `packages*/*/src/` for `js,ts,tsx`.
- `pnpm lint:style` — Stylelint over `**/src/**/*.{css,less,ts,tsx}` (CSS-in-JS via styled-components is linted too).
- `pnpm lint:md` — markdownlint over all `*.md` outside `node_modules`.
- `pnpm depcheck` / `pnpm depcheck:packages` — dependency hygiene at root / per package (skips `web`).
- `pnpm ncu` / `pnpm ncu:packages` / `pnpm taze` — bulk dependency upgrades. Re-run `pnpm boot` afterwards.
- `pnpm lerna:publish[:patch|:minor|:canary]` — publishes via lerna. `lerna.json` restricts `allowBranch` to `lerna/pub`, so publish from that branch only.

## Per-package commands

Every publishable package follows the same `scripts` shape (see `template/template-lib/package.json` for the canonical minimal version, and `packages-canvas/canvas-marking/package.json` for one with Storybook):

- `start` — `storybook dev -p 6006` for packages that have stories.
- `build:esm` / `build:cjs` — `babel src -d dist/{esm,cjs} --extensions .ts,.tsx`. **The `ESM` env var (`ESM=1` vs `ESM=0`) toggles `modules: false` vs `cjs` inside `.babelrc.js`** — it is not a no-op, and any new package's `.babelrc.js` must read `process.env.ESM` the same way.
- `build:types` — `tsc --emitDeclarationOnly` into `dist/types`.
- `build` — runs the three above sequentially.
- `watch` — `pnpm build:esm -w`.
- `test` / `test:cov` — `vitest` (only in packages that ship tests, e.g. `packages-fetcher/fetcher`).
- `prepublishOnly` — `build:clean && build`. This is what `boot:packages` invokes.

To work in a single package: `pnpm --filter @kcuf/<name> <script>` from the root, or `cd` into the package and run `pnpm <script>` directly. Run a single vitest file with `pnpm --filter @kcuf/fetcher exec vitest run path/to/file.test.ts`.

## Build model

- **Babel, not a bundler.** Each package emits parallel `dist/esm/`, `dist/cjs/`, and `dist/types/` trees that mirror `src/`. `package.json` points `main` → cjs, `module` → esm, `types` → types. Do not introduce Rollup/tsup/etc. without aligning with the existing pattern.
- **Babel preset targets** (in each package's `.babelrc.js`) intentionally include very old browsers (IE11, Safari 11.1, Chrome 67, Firefox 60). `@babel/plugin-transform-runtime` is on, and `@babel/runtime` is declared as a peer dep in every published package — keep that contract when adding new packages.
- **TypeScript** extends `@kcuf/ts-config` (a workspace package). Root `tsconfig.json` only exists to drive the IDE / linting includes; it does not emit. Type emission is per-package via `build:types`.
- **ESLint** uses the flat-config `@kcuf/eslint-config` (also a workspace package). The root `eslint.config.js` globally ignores `**/*/.babelrc.js` — there's a known issue with `module`/`process` not resolving in those files, so don't try to "fix" lint errors there.
- **Workspace deps** are pinned with `workspace:^`. When one workspace package depends on another's built output, that other package must have been built (`boot:packages`) — there is no dev-time TS path mapping.

## Quality gates

- **Husky + lint-staged**: `pre-commit` runs `lint-staged`, which runs `npmPkgJsonLint` on `package.json`, `markdownlint-cli2` on `*.md`, and `stylelint --fix strict` + `eslint` on `*.{js,ts,tsx}`. **`stylelint --fix` runs against TS/TSX too** (styled-components), so expect Stylelint failures on JS files to block commits.
- **Commitlint**: `commit-msg` enforces `@commitlint/config-conventional`. Use conventional-commit prefixes (`feat:`, `fix:`, `chore:`, …); the existing log uses emoji suffixes freely (e.g. `chore: 🧊 lerna version`).
- **`.depcheckrc.yaml`** intentionally ignores tooling that depcheck can't trace (eslint/stylelint plugins, babel presets, storybook addons, `@kcuf/*-config`). Add to that ignore list rather than adding fake usages when depcheck flags a tool dep.

## When adding a new package

1. Copy from `template/template-lib` (library) or `template/template-rc` / `template-rc-swc` (React component). The `template/` directory is **not** in the workspace, so a copy is required.
2. Place under the matching `packages-*/` group; the workspace will pick it up automatically.
3. Choose the right scope: `@kcuf/` (default), `@kcuf-ui/` (UI), `@kcuf-hook/` (hooks). The `kcuf-ui` aggregator package re-exports selected `@kcuf-ui/*` deps — update its `dependencies` if the new package belongs there.
4. Run `pnpm boot` then `pnpm --filter <new-pkg> build` before any other workspace package depends on it.

## Known caveats (from README)

- Lerna currently can't avoid committing the lockfile (lerna issue #4066) — `boot` deliberately uses `pnpm i` (with lockfile) rather than `--no-lockfile`. Don't "fix" this preemptively.
- `taze.config.ts` excludes `unfetch` (5.x ships only `.mjs`) and `eslint` (pinned awaiting `eslint-plugin-react` issue #3977). Respect those holds when bumping deps.
