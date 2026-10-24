# Status

Last update: 2026-10-24.

Replace this file when the status changes. Do not append a history log.

## Current state

- The site builds as a static export with Fumadocs and Next.js.
- `sources.json` lists two sources: Rust (`crabxl/crabxl`) and Python
  (`crabxl/crabxl-python`). Each source has only an introduction page.
- The content checker and the Vale writing rules work. The reusable workflow
  `check-docs.yml` runs them in the source repositories.
- The deploy workflow builds the site. It deploys only when the Cloudflare
  secrets are set.

## Configuration to do

These steps need access to the accounts. An agent cannot do them.

1. Create a Cloudflare Pages project with Direct Upload. The default name is
   `crabxl-docs`.
2. Add the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to this
   repository. If the project has another name, add the variable
   `CLOUDFLARE_PAGES_PROJECT`.
3. If the site uses a custom domain, add the variable `SITE_URL`.
4. Add the secret `DOCS_DISPATCH_TOKEN` to `crabxl/crabxl` and
   `crabxl/crabxl-python`. See [CONTRIBUTING.md](../CONTRIBUTING.md#source-repository-workflow).
   Without it, the daily build includes source changes.

## Next tasks

### Documentation content (to do)

The source repositories write their pages. Their `internal/STATUS.md` files
list the pages.

In this repository:

1. Add an overview page about concepts: streaming, loaded workbooks, memory
   limits and what "unsupported" means.
2. Publish the glossary as a site page.
3. Generate the support tables from the capability inventory of each source.

### Site

1. Add a version selector when a source has more than one supported release.
2. Consider a Python API reference with `fumadocs-python`.
3. Add a license for the site code.

## Decisions

- Each source keeps its documentation next to its code. Changes to code and
  documentation are reviewed together.
- GitHub Actions builds the site. Cloudflare Pages only serves the files.
  This permits any build tool in CI, for example Python for API reference
  generation.
- The writing rules use the principles of ASD-STE100. The STE dictionary is not
  used. The project glossary replaces it.
