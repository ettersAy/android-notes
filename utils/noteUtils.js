// utils/noteUtils.js

/**
 * Normalize a note title:
 * - trim leading/trailing whitespace
 * - collapse internal whitespace (including newlines/tabs) to single spaces
 */
export function normalizeTitle(title) {
  if (typeof title !== 'string') return '';
  return title.replace(/\s+/g, ' ').trim();
}

/**
 * Build a preview from note body content:
 * - takes first non-empty lines
 * - trims whitespace
 * - limits total preview length to `limit` characters and adds ellipsis if truncated
 */
export function buildNotePreview(text, limit = 100) {
  if (!text || typeof text !== 'string') return '';
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const joined = lines.join(' ');
  if (joined.length <= limit) return joined;
  const truncated = joined.slice(0, Math.max(0, limit - 1)).trimEnd();
  return truncated.length ? `${truncated}…` : '…';
}

/**
 * A simple check to determine if a note is effectively empty
 * (after normalization/trim).
 */
export function isEmptyNote({ title, note }) {
  const t = normalizeTitle(title || '');
  const n = (note || '').replace(/\s+/g, '').trim();
  return t.length === 0 && n.length === 0;
}
