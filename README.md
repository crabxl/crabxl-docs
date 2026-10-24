# CrabXL documentation site

This repository builds the CrabXL documentation site with
[Fumadocs](https://fumadocs.dev). It does not contain the language
documentation itself. Each source repository keeps its documentation in its own
`docs/` folder. This repository copies those folders, checks them, builds a
static site and deploys it to Cloudflare Pages.

| Section | Source |
|---|---|
| `/docs/rust` | [crabxl/crabxl](https://github.com/crabxl/crabxl) `docs/` |
| `/docs/python` | [crabxl/crabxl-python](https://github.com/crabxl/crabxl-python) `docs/` |
| `/docs` (overview) | `content/docs/` in this repository |

## Contents

| Path | Contents |
|---|---|
| `sources.json` | The source repositories. |
| `scripts/fetch-sources.mjs` | Copies the `docs/` folder of each source to `content/docs/<id>`. |
| `scripts/check-content.mjs` | Checks a folder against the [content specification](CONTENT-SPEC.md). |
| `content/docs/` | Pages that this repository owns: the overview. |
| `.vale.ini`, `styles/` | Writing checks. See [WRITING.md](WRITING.md). |
| `.github/workflows/deploy.yml` | Builds and deploys the site. |
| `.github/workflows/check-docs.yml` | Reusable check for the `docs/` folder of a source repository. |

## Build the site on your computer

You need Node.js 22 or later.

```sh
npm ci
npm run fetch
npm run check
npm run dev
```

`npm run dev` starts a server at http://localhost:3000. `npm run build` writes
the static site to `out/`.

To preview changes to a source repository before you push them, use a local
folder:

```sh
npm run fetch -- --local rust=../crabxl/docs --local python=../crabxl-python/docs
```

## Deployment

GitHub Actions builds the site and deploys the `out/` folder to Cloudflare
Pages with Direct Upload. Cloudflare does not build the site.

The workflow runs:

- On a push to `main`.
- When a source repository sends a `docs-updated` event.
- Every day, to include changes that did not send an event.
- On a pull request. A pull request from this repository gets a preview URL.

### Configuration

Set these in **Settings → Secrets and variables → Actions** of this repository:

| Name | Type | Value |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Secret | An API token with the **Cloudflare Pages: Edit** permission. |
| `CLOUDFLARE_ACCOUNT_ID` | Secret | The Cloudflare account ID. |
| `CLOUDFLARE_PAGES_PROJECT` | Variable | The Pages project name. The default is `crabxl-docs`. |
| `SITE_URL` | Variable | The public URL of the site. The default is `https://crabxl-docs.pages.dev`. |

Create the Pages project as a **Direct Upload** project. Do not connect it to
Git. If the secrets are not set, the workflow builds the site but does not
deploy it.

## Add a source

1. Add a `docs/` folder to the repository. Follow the
   [content specification](CONTENT-SPEC.md).
2. Add the repository to `sources.json`.
3. Add the new `id` to `pages` in `content/docs/meta.json`.
4. Add the [source workflow](CONTRIBUTING.md#source-repository-workflow) to the
   repository.
