// __tests__/noteUtils.test.js
import { normalizeTitle, buildNotePreview, isEmptyNote } from '../utils/noteUtils';

describe('noteUtils', () => {
  describe('normalizeTitle', () => {
    it('trims and collapses whitespace', () => {
      expect(normalizeTitle('  Hello   World \n\t Test  ')).toBe('Hello World Test');
    });

    it('handles non-string input gracefully', () => {
      expect(normalizeTitle(null)).toBe('');
      expect(normalizeTitle(undefined)).toBe('');
      expect(normalizeTitle(123)).toBe('');
    });
  });

  describe('buildNotePreview', () => {
    it('joins non-empty lines and trims', () => {
      const text = ' Line 1 \n\n  \tLine 2  \nLine 3   ';
      expect(buildNotePreview(text, 100)).toBe('Line 1 Line 2 Line 3');
    });

    it('truncates and adds ellipsis when exceeding limit', () => {
      const text = 'This is a long note that should be truncated at some point to create a preview.';
      const preview = buildNotePreview(text, 20);
      expect(preview).toBe('This is a long note…');
      expect(preview.length).toBeLessThanOrEqual(20);
    });

    it('returns empty string for falsy or non-string inputs', () => {
      expect(buildNotePreview('')).toBe('');
      expect(buildNotePreview(null)).toBe('');
      expect(buildNotePreview(undefined)).toBe('');
      expect(buildNotePreview(42)).toBe('');
    });
  });

  describe('isEmptyNote', () => {
    it('returns true when both title and note are empty after normalization', () => {
      expect(isEmptyNote({ title: '   ', note: '\n\t ' })).toBe(true);
    });

    it('returns false when title has content', () => {
      expect(isEmptyNote({ title: ' Hello ', note: '   ' })).toBe(false);
    });

    it('returns false when note has content', () => {
      expect(isEmptyNote({ title: '   ', note: ' Body ' })).toBe(false);
    });
  });
});
