# Instructions for AI agents

These rules apply to AI agents that work on this repository. Human contributors
use [CONTRIBUTING.md](CONTRIBUTING.md). The rules in CONTRIBUTING.md also apply
to agents.

Read [internal/STATUS.md](internal/STATUS.md) before you start. It tells you
the current state and the next tasks.

## Purpose

This repository builds the documentation site. It owns:

- The site code (Fumadocs on Next.js, static export).
- The [content specification](CONTENT-SPEC.md) for the `docs/` folders of the
  source repositories, and its checker `scripts/check-content.mjs`.
- The [writing rules](WRITING.md), the [glossary](GLOSSARY.md) and the Vale
  rules in `styles/`.
- The overview pages in `content/docs/`.

It does not own the language documentation. Change that in the `docs/` folder
of the source repository. Do not copy source pages into this repository.

## Language and identity

- Write all repository content in English.
- Use this Git identity for author and committer, unless the user gives another
  identity: `cmostw <300344883+cmostw@users.noreply.github.com>`. Set it in the
  repository configuration. Do not use the global identity of the environment.

## Writing rules

Follow [WRITING.md](WRITING.md). It applies to all text, including internal
records and commit messages. Do not record conversations. Record the decision
and its reason.

## Where to write records

- `internal/STATUS.md` is the single current status. Replace its content when
  the status changes. Do not append a history log.

## Rules for changes

- Keep the site a static export. Cloudflare Pages serves the `out/` folder.
  Do not add features that need a server.
- A change to the content specification, the checker, `.vale.ini` or `styles/`
  affects the CI of every source repository. Run `npm run fetch` and the
  checks before you push such a change.
- Keep `CONTENT-SPEC.md` and `scripts/check-content.mjs` consistent.
- Pin tool versions in workflows.

## Checks

```sh
npm run fetch
npm run check
vale content/docs
npm run types:check
npm run build
```

## Commits

- Read and follow [Coherent Commits](.agents/skills/commit/SKILL.md) before you
  make a commit.
- Use Conventional Commits: `<type>(<scope>): <description>`. Describe the
  result, not the work process.
- Push each commit immediately after you make it.
- Do not force-push unless the user authorizes it.
