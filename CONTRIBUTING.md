# Contributing to the CrabXL documentation site

This repository contains the site, the content specification and the writing
rules. To change the documentation of a language, change the `docs/` folder of
that language repository:

- Rust: [crabxl/crabxl](https://github.com/crabxl/crabxl/tree/main/docs)
- Python: [crabxl/crabxl-python](https://github.com/crabxl/crabxl-python/tree/main/docs)

Change this repository to change the site layout, the overview pages, the
content specification, the writing rules or the glossary.

## Setup

You need Node.js 22 or later.

```sh
npm ci
npm run fetch
npm run dev
```

## Checks

Run these checks before you open a pull request:

```sh
npm run check
vale content/docs
npm run types:check
npm run build
```

[Install Vale](https://vale.sh/docs/install) to run the writing checks.

## Rules

- Follow the [writing rules](WRITING.md) and the [glossary](GLOSSARY.md).
- If you change the [content specification](CONTENT-SPEC.md), change
  `scripts/check-content.mjs` in the same pull request.
- If you add a term to the glossary that has common synonyms, add a
  replacement to `styles/CrabXL/Terms.yml`.
- A change to `scripts/check-content.mjs`, `.vale.ini` or `styles/` affects the
  CI of all source repositories. Run the checks on each source before you
  merge.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  `<type>(<scope>): <description>`.

## Source repository workflow

Each source repository has a workflow that checks its `docs/` folder and starts
a rebuild of the site:

```yaml
name: Documentation

on:
  push:
    branches: [main]
    paths: [docs/**]
  pull_request:
    paths: [docs/**]

permissions:
  contents: read

jobs:
  check:
    uses: crabxl/crabxl-docs/.github/workflows/check-docs.yml@main

  rebuild-site:
    needs: check
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: Start a rebuild of the documentation site
        env:
          HOOK: ${{ secrets.DOCS_DEPLOY_HOOK }}
        run: |
          if [ -z "$HOOK" ]; then
            echo "::notice::DOCS_DEPLOY_HOOK is not set. The daily rebuild includes this change."
            exit 0
          fi
          curl -fsS -X POST "$HOOK"
```

`DOCS_DEPLOY_HOOK` is the URL of the Cloudflare Pages deploy hook. Store it as
an Actions secret in each source repository. The URL can only start a build.
