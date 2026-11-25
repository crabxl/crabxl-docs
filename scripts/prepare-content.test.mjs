// Run with: pnpm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pageUrl, rewriteLinks } from './prepare-content.mjs';

test('page URLs drop the extension and index', () => {
  assert.equal(pageUrl('python/index.md'), '/docs/python');
  assert.equal(
    pageUrl('python/openpyxl/guide/tutorial.md'),
    '/docs/python/openpyxl/guide/tutorial',
  );
  assert.equal(pageUrl('index.mdx'), '/docs');
});

test('relative page links become page URLs', () => {
  const text = [
    'See [Workbooks](workbooks.md) and [rules](../values.md#dates "Dates").',
    '[ref]: openpyxl/index.md',
    '```md',
    '[in code](workbooks.md)',
    '```',
    '[web](https://example.com/a.md), [image](chart.png), [up](../../../x.md)',
  ].join('\n');
  assert.equal(
    rewriteLinks(text, 'python/openpyxl/index.md'),
    [
      'See [Workbooks](/docs/python/openpyxl/workbooks) and [rules](/docs/python/values#dates "Dates").',
      '[ref]: /docs/python/openpyxl/openpyxl',
      '```md',
      '[in code](workbooks.md)',
      '```',
      '[web](https://example.com/a.md), [image](chart.png), [up](../../../x.md)',
    ].join('\n'),
  );
});
