// __tests__/clipboard.test.js
// Optional: runs if a Jest setup already exists in the project.
import { composeAllNotesText } from '../utils/clipboard';

describe('composeAllNotesText', () => {
  it('returns empty string for empty input', () => {
    expect(composeAllNotesText([])).toBe('');
    expect(composeAllNotesText(null)).toBe('');
  });

  it('formats single note', () => {
    const out = composeAllNotesText([{ title: 'Hello', body: 'World' }]);
    expect(out).toBe('# Hello\nWorld');
  });

  it('falls back to (Untitled) and empty body', () => {
    const out = composeAllNotesText([{ title: '   ', body: ' ' }]);
    expect(out).toBe('# (Untitled)\n');
  });

  it('joins with separator for multiple notes', () => {
    const out = composeAllNotesText([
      { title: 'A', body: 'a' },
      { title: 'B', body: 'b' },
    ]);
    expect(out).toBe('# A\na\n\n---\n\n# B\nb');
  });
});
