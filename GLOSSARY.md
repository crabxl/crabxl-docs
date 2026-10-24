# Glossary

Use these terms in all CrabXL documentation. Use one term for one meaning. If a
new term is necessary, add it here in the same pull request.

The Vale rule [Terms](styles/CrabXL/Terms.yml) replaces common alternatives.
Add a replacement there when you add a term that has common synonyms.

## Files and structure

| Term | Meaning | Do not use |
|---|---|---|
| XLSX file | A file in the Office Open XML spreadsheet format. | Excel file, spreadsheet file |
| workbook | The content of an XLSX file: worksheets, styles and other parts. | spreadsheet, document |
| worksheet | One sheet of cells in a workbook. In API names, "sheet" is permitted. | tab, page |
| cell | One position in a worksheet, for example A1. | field |
| row, column | A horizontal or vertical line of cells. | line |
| range | A rectangle of cells, for example `A1:C3`. | area, block |
| part | One file inside the XLSX package, for example a worksheet XML file. | entry, member |

## Operations

| Term | Meaning | Do not use |
|---|---|---|
| read | Get data from an existing XLSX file. | parse, load (for data) |
| stream | Read rows one at a time, with bounded memory. | iterate lazily |
| load | Make an editable model of a workbook in memory. | open (for this meaning) |
| create | Make a new workbook. | generate |
| write | Produce an XLSX file from a model or from rows. | export, serialize |
| edit | Change an existing workbook. | modify, patch |
| preserve | Keep a part without change when you save. | retain, keep as-is |
| save | Write the workbook to a file. | store, persist |

## Values

| Term | Meaning | Do not use |
|---|---|---|
| value | The content of a cell: number, text, boolean, error, date or formula. | data, content |
| formula | An expression in a cell, for example `=SUM(A1:A3)`. | equation |
| cached result | The last result of a formula that the file stores. CrabXL does not calculate formulas. | calculated value |
| style | The appearance of a cell: font, fill, border, alignment, protection and number format. | format (for all appearance) |
| number format | The display pattern of a value, for example `0.00`. | format code |

## Project

| Term | Meaning | Do not use |
|---|---|---|
| core | The Rust implementation in the `crabxl` repository. | engine (in text), backend |
| binding | A package for another language that uses the core, for example the Python package. | adapter, wrapper |
| reference library | The library that a binding is compatible with, for example openpyxl. | upstream (for this meaning) |
| unsupported | A feature that CrabXL does not implement yet. It gives an explicit error. | not available, missing |
| memory limit | A configured maximum for memory that CrabXL manages. It is not a limit for the full process. | budget, allowance (in user text) |
