export interface TextPart {
  type: 'text' | 'highlight';
  content: string;
}

export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function processText(text: string, search: string, caseSensitive: boolean = false): TextPart[] {
  if (!text || !search) return [{ type: 'text', content: text }];

  try {
    const flags = caseSensitive ? 'g' : 'gi';
    const escapedSearch = escapeRegex(search);
    const regex = new RegExp(escapedSearch, flags);
    const parts: TextPart[] = [];

    let lastIndex = 0;
    let match;

    regex.lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'highlight',
        content: match[0]
      });

      lastIndex = match.index + match[0].length;

      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts.length ? parts : [{ type: 'text', content: text }];
  } catch (error) {
    console.warn('Error processing text for highlighting:', error);
    return [{ type: 'text', content: text }];
  }
}