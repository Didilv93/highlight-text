import { describe, it, expect } from 'vitest';
import { escapeRegex, processText } from '../textProcessor';

describe('Text Processor Utils', () => {
  describe('escapeRegex', () => {
    it('should escape all regex special characters', () => {
      const specialChars = ['.', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\'];
      
      specialChars.forEach(char => {
        const escaped = escapeRegex(char);
        expect(escaped).toBe(`\\${char}`);
      });
    });

    it('should handle complex patterns', () => {
      expect(escapeRegex('$100.50')).toBe('\\$100\\.50');
      expect(escapeRegex('(test)')).toBe('\\(test\\)');
      expect(escapeRegex('[abc]')).toBe('\\[abc\\]');
    });

    it('should handle empty string', () => {
      expect(escapeRegex('')).toBe('');
    });

    it('should handle regular text without special chars', () => {
      expect(escapeRegex('hello world')).toBe('hello world');
    });
  });

  describe('processText', () => {
    it('should return text part when search is empty', () => {
      const result = processText('hello world', '');
      expect(result).toEqual([{ type: 'text', content: 'hello world' }]);
    });

    it('should return text part when text is empty', () => {
      const result = processText('', 'search');
      expect(result).toEqual([{ type: 'text', content: '' }]);
    });

    it('should find single match', () => {
      const result = processText('hello world', 'world');
      expect(result).toEqual([
        { type: 'text', content: 'hello ' },
        { type: 'highlight', content: 'world' }
      ]);
    });

    it('should find multiple matches', () => {
      const result = processText('test this test', 'test');
      expect(result).toEqual([
        { type: 'highlight', content: 'test' },
        { type: 'text', content: ' this ' },
        { type: 'highlight', content: 'test' }
      ]);
    });

    it('should be case insensitive by default', () => {
      const result = processText('Hello HELLO hello', 'hello');
      expect(result).toEqual([
        { type: 'highlight', content: 'Hello' },
        { type: 'text', content: ' ' },
        { type: 'highlight', content: 'HELLO' },
        { type: 'text', content: ' ' },
        { type: 'highlight', content: 'hello' }
      ]);
    });

    it('should respect case sensitivity when enabled', () => {
      const result = processText('Hello HELLO hello', 'hello', true);
      expect(result).toEqual([
        { type: 'text', content: 'Hello HELLO ' },
        { type: 'highlight', content: 'hello' }
      ]);
    });

    it('should handle regex special characters', () => {
      const result = processText('Price: $100.50', '$100.50');
      expect(result).toEqual([
        { type: 'text', content: 'Price: ' },
        { type: 'highlight', content: '$100.50' }
      ]);
    });

    it('should handle match at beginning', () => {
      const result = processText('start middle end', 'start');
      expect(result).toEqual([
        { type: 'highlight', content: 'start' },
        { type: 'text', content: ' middle end' }
      ]);
    });

    it('should handle match at end', () => {
      const result = processText('start middle end', 'end');
      expect(result).toEqual([
        { type: 'text', content: 'start middle ' },
        { type: 'highlight', content: 'end' }
      ]);
    });

    it('should handle full text match', () => {
      const result = processText('hello', 'hello');
      expect(result).toEqual([
        { type: 'highlight', content: 'hello' }
      ]);
    });

    it('should handle no matches', () => {
      const result = processText('hello world', 'xyz');
      expect(result).toEqual([
        { type: 'text', content: 'hello world' }
      ]);
    });
  });
});