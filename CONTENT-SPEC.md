# Content specification

This specification applies to the `docs/` folder of each source repository.
The site copies that folder to `/docs/<id>`, where `<id>` comes from
[sources.json](sources.json).

`scripts/check-content.mjs` checks these rules. The reusable workflow
`check-docs.yml` runs it in each source repository.

## Folder

- The folder contains only public user documentation. Put internal records in
  `internal/` of the source repository.
- The folder has an `index.md` or `index.mdx` file. It is the first page of the
  section.
- The folder has a `meta.json` file.
- Use lowercase letters, digits and hyphens in file and folder names. For
  example: `reading-rows.md`.
- Permitted file types: `.md`, `.mdx`, `meta.json`, and images (`.png`, `.jpg`,
  `.jpeg`, `.svg`, `.webp` and `.gif`).

## Pages

Each page starts with frontmatter that has a `title` and a `description`:

```md
---
title: Read rows
description: Stream the rows of a worksheet with bounded memory.
---
```

- The site shows the title as the page heading. Do not add a level-1 heading
  (`# Title`). Start the sections with level-2 headings (`##`).
- The description is one sentence. Search results and link previews show it.
- Use `.md` for plain Markdown. Use `.mdx` only if the page uses a component.
- Do not use `import` or `export` statements.

## Components

A page can use only these components. The site provides them.

| Component | Use |
|---|---|
| `Callout` | A note or a warning. |
| `Cards`, `Card` | Links to other pages. |
| `Tabs`, `Tab` | Alternatives, for example two platforms. |
| `Steps`, `Step` | A procedure with numbered steps. |
| `Accordions`, `Accordion` | Content that the reader can expand. |
| `Files`, `File`, `Folder` | A file tree. |

The [Fumadocs documentation](https://fumadocs.dev/docs/ui/components) describes
their properties.

## Links

- Link to another page in the same folder with a relative path, for example
  `[Write rows](write-rows.md)`.
- Link to a file outside the `docs/` folder with a full URL, for example
  `https://github.com/crabxl/crabxl/blob/main/crates/crabxl/examples/quickstart.rs`.
  A relative link outside the folder does not work on the site.
- Do not use links that start with `/`.
- Link to another language section with a full site URL.

## Navigation

`meta.json` sets the order of the pages in the sidebar:

```json
{
  "title": "Rust",
  "pages": ["index", "install", "read-rows", "write-rows"]
}
```

- `pages` lists file names without the extension, and folder names. A page
  that is not in the list is not in the sidebar. Add `"..."` to the list to
  include the other pages in alphabetical order.
- A subfolder can have its own `meta.json`.
- Do not set `root` in the top-level `meta.json`. The site sets it. The site
  also replaces `title` and `description` with the values from `sources.json`.

## Standard sections

Each language section uses the same structure, so readers find the same
information in each language. A section does not need all pages at the start.

| Page | Contents |
|---|---|
| `index` | What the package does, installation, a short example. |
| `quick-start` | A complete first program: create, read and edit a workbook. |
| `guide/` | Tasks: reading, writing, editing, styles, dates and formulas, memory, errors. |
| `support` | Supported features, by read, create and edit. |
| `migration` | Migration from the reference library (for example openpyxl), if there is one. |
| `changelog` | A link to the changelog of the package. |

## Writing

Follow the [writing rules](WRITING.md) and the [glossary](GLOSSARY.md). Vale
checks them.
