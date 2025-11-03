import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import HighlightText from '../index';

describe('HighlightText Component', () => {
  describe('Basic functionality', () => {
    it('should render children without search term', () => {
      render(
        <HighlightText search="">
          <p>Hello world</p>
        </HighlightText>
      );
      
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('should highlight matching text', () => {
      render(
        <HighlightText search="world">
          <p>Hello world</p>
        </HighlightText>
      );
      
      const highlightedElement = screen.getByText('world');
      expect(highlightedElement).toBeInTheDocument();
      expect(highlightedElement.tagName).toBe('MARK');
      expect(highlightedElement).toHaveClass('highlight');
    });

    it('should highlight multiple occurrences', () => {
      render(
        <HighlightText search="test">
          <div>
            <p>This is a test</p>
            <span>Another test here</span>
          </div>
        </HighlightText>
      );
      
      const highlights = screen.getAllByText('test');
      expect(highlights).toHaveLength(2);
      highlights.forEach(element => {
        expect(element.tagName).toBe('MARK');
        expect(element).toHaveClass('highlight');
      });
    });

    it('should preserve HTML structure', () => {
      render(
        <HighlightText search="React">
          <div>
            <h1>Learning React</h1>
            <p>React is awesome</p>
            <ul>
              <li>React hooks</li>
              <li>React components</li>
            </ul>
          </div>
        </HighlightText>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Learning React');
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      
      const highlights = screen.getAllByText('React');
      expect(highlights).toHaveLength(4);
    });
  });

  describe('Case sensitivity', () => {
    it('should be case insensitive by default', () => {
      render(
        <HighlightText search="react">
          <p>React REACT react</p>
        </HighlightText>
      );
      
      const highlights = screen.getAllByText(/react/i);
      expect(highlights).toHaveLength(3);
    });

    it('should respect case sensitivity when enabled', () => {
      render(
        <HighlightText search="react" caseSensitive={true}>
          <p>React REACT react</p>
        </HighlightText>
      );
      
      const exactMatches = screen.getAllByText('react');
      expect(exactMatches).toHaveLength(1);
      
      expect(exactMatches[0]).toHaveClass('highlight');
      
      expect(screen.getByText(/React REACT/)).toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    it('should apply custom CSS class', () => {
      render(
        <HighlightText search="test" highlightClassName="custom-highlight">
          <p>This is a test</p>
        </HighlightText>
      );
      
      const highlight = screen.getByText('test');
      expect(highlight).toHaveClass('custom-highlight');
      expect(highlight).not.toHaveClass('highlight');
    });

    it('should apply custom container class', () => {
      const { container } = render(
        <HighlightText search="test" className="custom-container">
          <p>This is a test</p>
        </HighlightText>
      );
      
      const containerDiv = container.firstChild;
      expect(containerDiv).toHaveClass('custom-container');
    });

    it('should apply inline styles via highlightStyle prop', () => {
      const { container } = render(
        <HighlightText 
          search="test" 
          highlightStyle={{
            backgroundColor: '#ff0000',
            color: '#ffffff',
            fontWeight: 'bold'
          }}
        >
          <p>This is a test</p>
        </HighlightText>
      );
      
      const containerDiv = container.firstChild as HTMLElement;
      expect(containerDiv.style.getPropertyValue('--highlight-bg-color')).toBe('#ff0000');
      expect(containerDiv.style.getPropertyValue('--highlight-text-color')).toBe('#ffffff');
      expect(containerDiv.style.getPropertyValue('--highlight-font-weight')).toBe('bold');
    });
  });

  describe('Regex patterns', () => {
    it('should handle regex special characters', () => {
      render(
        <HighlightText search="[test]">
          <p>This [test] should be highlighted</p>
        </HighlightText>
      );
      
      const highlight = screen.getByText('[test]');
      expect(highlight).toBeInTheDocument();
      expect(highlight).toHaveClass('highlight');
    });

    it('should handle multiple words with OR pattern', () => {
      render(
        <HighlightText search="React|JavaScript">
          <p>React and JavaScript are great</p>
        </HighlightText>
      );
      
      expect(screen.queryByText('React|JavaScript')).not.toBeInTheDocument();
      
      const { rerender } = render(
        <HighlightText search="React">
          <p>React and JavaScript are great</p>
        </HighlightText>
      );
      
      expect(screen.getByText('React')).toHaveClass('highlight');
      
      rerender(
        <HighlightText search="JavaScript">
          <p>React and JavaScript are great</p>
        </HighlightText>
      );
      
      expect(screen.getByText('JavaScript')).toHaveClass('highlight');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty search string', () => {
      render(
        <HighlightText search="">
          <p>No highlights here</p>
        </HighlightText>
      );
      
      expect(screen.getByText('No highlights here')).toBeInTheDocument();
      expect(screen.queryByRole('mark')).not.toBeInTheDocument();
    });

    it('should handle null/undefined children', () => {
      render(
        <HighlightText search="test">
          {null}
          {undefined}
          <p>Valid content</p>
        </HighlightText>
      );
      
      expect(screen.getByText('Valid content')).toBeInTheDocument();
    });

    it('should handle number children', () => {
      render(
        <HighlightText search="123">
          {123456}
        </HighlightText>
      );
      
      const highlight = screen.getByText('123');
      expect(highlight).toHaveClass('highlight');
    });

    it('should handle nested React elements', () => {
      render(
        <HighlightText search="nested">
          <div>
            <span>
              <strong>This is nested content</strong>
            </span>
          </div>
        </HighlightText>
      );
      
      const highlight = screen.getByText('nested');
      expect(highlight).toHaveClass('highlight');
      
      const { container } = render(
        <HighlightText search="nested">
          <div>
            <span>
              <strong>This is nested content</strong>
            </span>
          </div>
        </HighlightText>
      );
      
      const strongElement = container.querySelector('strong');
      expect(strongElement).toBeInTheDocument();
      expect(strongElement?.textContent).toContain('This is nested content');
    });

    it('should handle arrays of children', () => {
      const items = ['First item', 'Second item', 'Third item'];
      
      render(
        <HighlightText search="item">
          {items.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </HighlightText>
      );
      
      const highlights = screen.getAllByText('item');
      expect(highlights).toHaveLength(3);
    });
  });

  describe('Performance and memoization', () => {
    it('should have displayName for debugging', () => {
      expect(HighlightText.displayName).toBe('HighlightText');
    });

    it('should not re-render with same props', () => {
      let renderCount = 0;
      
      const TestWrapper = ({ search }: { search: string }) => {
        renderCount++;
        return (
          <HighlightText search={search}>
            <p>Test content</p>
          </HighlightText>
        );
      };
      
      const { rerender } = render(<TestWrapper search="Test" />);
      expect(renderCount).toBe(1);
      
      rerender(<TestWrapper search="Test" />);
      
      expect(screen.getByText('Test')).toHaveClass('highlight');
    });
  });
});