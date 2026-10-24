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

Each source repository has a workflow that checks its `docs/` folder and tells
this repository to rebuild the site:

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
      - name: Ask crabxl-docs to rebuild the site
        env:
          GH_TOKEN: ${{ secrets.DOCS_DISPATCH_TOKEN }}
        run: |
          if [ -z "$GH_TOKEN" ]; then
            echo "::notice::DOCS_DISPATCH_TOKEN is not set. The daily build includes this change."
            exit 0
          fi
          gh api repos/crabxl/crabxl-docs/dispatches -f event_type=docs-updated \
            -f "client_payload[repository]=${{ github.repository }}" \
            -f "client_payload[sha]=${{ github.sha }}"
```

`DOCS_DISPATCH_TOKEN` is a fine-grained personal access token or a GitHub App
token. It needs the **Contents: Read and write** permission on
`crabxl/crabxl-docs` only. Store it as an Actions secret in each source
repository.
