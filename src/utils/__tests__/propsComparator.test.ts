import { describe, it, expect } from 'vitest';
import { arePropsEqual, type ComponentProps } from '../propsComparator';

describe('Props Comparator Utils', () => {
  const baseProps: ComponentProps = {
    search: 'test',
    caseSensitive: false,
    className: 'container',
    highlightClassName: 'highlight',
    children: 'test content'
  };

  describe('arePropsEqual', () => {
    it('should return true for identical props', () => {
      const props1 = { ...baseProps };
      const props2 = { ...baseProps };
      
      expect(arePropsEqual(props1, props2)).toBe(true);
    });

    it('should return false for different search terms', () => {
      const props1 = { ...baseProps, search: 'test' };
      const props2 = { ...baseProps, search: 'different' };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false for different caseSensitive values', () => {
      const props1 = { ...baseProps, caseSensitive: false };
      const props2 = { ...baseProps, caseSensitive: true };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false for different className values', () => {
      const props1 = { ...baseProps, className: 'container1' };
      const props2 = { ...baseProps, className: 'container2' };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false for different highlightClassName values', () => {
      const props1 = { ...baseProps, highlightClassName: 'highlight1' };
      const props2 = { ...baseProps, highlightClassName: 'highlight2' };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false for different children', () => {
      const props1 = { ...baseProps, children: 'content1' };
      const props2 = { ...baseProps, children: 'content2' };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should handle undefined highlightStyle', () => {
      const props1 = { ...baseProps };
      const props2 = { ...baseProps };
      
      expect(arePropsEqual(props1, props2)).toBe(true);
    });

    it('should return true for identical highlightStyle', () => {
      const style = { backgroundColor: 'yellow', color: 'black' };
      const props1 = { ...baseProps, highlightStyle: style };
      const props2 = { ...baseProps, highlightStyle: style };
      
      expect(arePropsEqual(props1, props2)).toBe(true);
    });

    it('should return true for equivalent highlightStyle objects', () => {
      const props1 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow', color: 'black' } };
      const props2 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow', color: 'black' } };
      
      expect(arePropsEqual(props1, props2)).toBe(true);
    });

    it('should return false for different backgroundColor', () => {
      const props1 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow' } };
      const props2 = { ...baseProps, highlightStyle: { backgroundColor: 'red' } };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false for different color', () => {
      const props1 = { ...baseProps, highlightStyle: { color: 'black' } };
      const props2 = { ...baseProps, highlightStyle: { color: 'white' } };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false for different fontWeight', () => {
      const props1 = { ...baseProps, highlightStyle: { fontWeight: 'bold' } };
      const props2 = { ...baseProps, highlightStyle: { fontWeight: 'normal' } };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false when one has highlightStyle and other does not', () => {
      const props1 = { ...baseProps };
      const props2 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow' } };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should return false when one highlightStyle is null', () => {
      const props1 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow' } };
      const props2 = { ...baseProps, highlightStyle: undefined };
      
      expect(arePropsEqual(props1, props2)).toBe(false);
    });

    it('should handle partial highlightStyle objects', () => {
      const props1 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow' } };
      const props2 = { ...baseProps, highlightStyle: { backgroundColor: 'yellow' } };
      
      expect(arePropsEqual(props1, props2)).toBe(true);
    });

    it('should handle empty highlightStyle objects', () => {
      const props1 = { ...baseProps, highlightStyle: {} };
      const props2 = { ...baseProps, highlightStyle: {} };
      
      expect(arePropsEqual(props1, props2)).toBe(true);
    });
  });
});