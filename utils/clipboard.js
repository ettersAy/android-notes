// utils/clipboard.js

/**
 * Compose a single string containing all notes for clipboard copy.
 * Format:
 * # Title
 * body
 *
 * ---
 *
 * Returns empty string if notes is empty or falsy.
 * @param {Array<{title?:string, body?:string}>} notes
 * @returns {string}
 */
export function composeAllNotesText(notes) {
  if (!Array.isArray(notes) || notes.length === 0) return '';
  return notes
    .map((n) => {
      const t = (n.title || '').trim() || '(Untitled)';
      const b = (n.body || '').trim() || '';
      return `# ${t}\n${b}`;
    })
    .join('\n\n---\n\n');
}
