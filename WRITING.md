# Writing rules

CrabXL documentation follows the principles of ASD-STE100 (Simplified
Technical English). We use the writing rules only. We do not use the STE
dictionary. The [glossary](GLOSSARY.md) gives the approved project terms.

These rules apply to user documentation, internal records, comments, error
messages and commit messages in all CrabXL repositories.

## Rules

1. **Write short sentences.** Use a maximum of 20 words in an instruction and
   25 words in a description.
2. **Give one instruction in each sentence.** Put a condition before the
   instruction: "If the file is large, use streaming mode."
3. **Use the imperative for instructions.** Write "Open the file", not "The
   file should be opened".
4. **Use the active voice.** Write "The reader returns a row", not "A row is
   returned by the reader".
5. **Use one word for one meaning.** Use the glossary term every time. Do not
   use synonyms to vary the text.
6. **Do not use unclear modal verbs.** Use "must" for a requirement and "can"
   for a possibility. Do not use "should", "may", "might" or "could".
7. **Do not put more than three nouns in a sequence.** Write "the limit for
   shared strings", not "the shared string memory budget limit".
8. **Write one topic in each paragraph.** Start the paragraph with the topic.
9. **Use lists for steps and for items that the reader compares.**
10. **Write for a new reader.** Do not use internal codes, such as milestone or
    release codes, without a definition. Do not describe the history of the
    work.
11. **Do not record conversations.** Do not write "the user approved". Write the
    decision and its reason.

## Examples

| Do not write | Write |
|---|---|
| Canonical bounded display-order updates are utilized. | CrabXL changes the sheet order. It does not load the cells. |
| The workbook should be closed. | Close the workbook. |
| It may be necessary to increase the limit. | If the file is larger than the limit, increase the limit. |
| On 2026-10-07 the user approved six releases. | The remaining work is in six releases. This reduces the packaging work. |

## Automatic checks

[Vale](https://vale.sh) checks some of these rules. The configuration is in
[.vale.ini](.vale.ini) and the rules are in [styles/CrabXL](styles/CrabXL):

| Rule | Level | Checks |
|---|---|---|
| `SentenceLength` | warning | Sentences with more than 25 words. |
| `Modals` | warning | "should", "may", "might" and "could". |
| `Vague` | warning | Words that add no meaning, such as "simply" or "very". |
| `Terms` | error | Terms that the glossary replaces. |
| `Passive` | suggestion | Possible passive voice. |
| `Vale.Spelling` | warning | Spelling. Add project words to `styles/config/vocabularies/CrabXL/accept.txt`. |

Only errors stop CI. Review warnings and suggestions, but a reviewer can accept
them when the text is clear.

To run Vale on your computer, [install it](https://vale.sh/docs/install) and
run:

```sh
vale --config /path/to/crabxl-docs/.vale.ini docs
```
