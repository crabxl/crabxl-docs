# CrabXL documentation site

This repository builds the CrabXL documentation site with
[Fumadocs](https://fumadocs.dev). It does not contain the language
documentation itself. Each source repository keeps its documentation in its own
`docs/` folder. This repository copies those folders, checks them and builds a
static site. Cloudflare Pages builds and serves it.

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
| `.github/workflows/ci.yml` | Checks and builds the site on each push and pull request. |
| `.github/workflows/rebuild.yml` | Starts a daily rebuild on Cloudflare Pages. |
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

Cloudflare Pages builds the site from this repository with its Git
integration. It builds on each push to `main` and makes a preview for each
other branch and pull request.

A rebuild is also necessary when a source repository changes its `docs/`
folder. Two mechanisms start it:

- Each source repository calls a Cloudflare deploy hook after a push that
  changes `docs/`.
- `.github/workflows/rebuild.yml` calls the deploy hook every day. This
  includes changes that did not call the hook.

### Cloudflare Pages settings

Connect this repository to a new Pages project and use these build settings:

| Setting | Value |
|---|---|
| Framework preset | None |
| Production branch | `main` |
| Build command | `npm run build:pages` |
| Build output directory | `out` |
| Environment variable `SITE_URL` | The public URL of the site, default is `https://docs.crabxl.com`. |

`.node-version` selects Node.js 22. `npm run build:pages` fetches the source
folders, checks them and builds the site.

### Deploy hook

1. In the Pages project, go to **Settings → Builds → Deploy hooks**.
2. Add a hook for the `main` branch.
3. Store the hook URL as an Actions secret:
   - `CLOUDFLARE_DEPLOY_HOOK` in this repository.
   - `DOCS_DEPLOY_HOOK` in each source repository.

If a secret is not set, the workflow that uses it does nothing.

## Add a source

1. Add a `docs/` folder to the repository. Follow the
   [content specification](CONTENT-SPEC.md).
2. Add the repository to `sources.json`.
3. Add the new `id` to `pages` in `content/docs/meta.json`.
4. Add the [source workflow](CONTRIBUTING.md#source-repository-workflow) to the
   repository.
