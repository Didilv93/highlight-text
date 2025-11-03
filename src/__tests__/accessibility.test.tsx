import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import HighlightText from '../index';

describe('HighlightText Accessibility & Performance', () => {
  describe('Accessibility', () => {
    it('should use semantic mark elements for highlights', () => {
      render(
        <HighlightText search="important">
          <p>This is important information</p>
        </HighlightText>
      );
      
      const highlight = screen.getByText('important');
      expect(highlight.tagName).toBe('MARK');
    });

    it('should preserve ARIA attributes', () => {
      render(
        <HighlightText search="test">
          <div>
            <p aria-label="Test paragraph">This is a test</p>
            <button aria-describedby="help-text">Test button</button>
            <span id="help-text">Help text for test</span>
          </div>
        </HighlightText>
      );
      
      const paragraph = screen.getByLabelText('Test paragraph');
      expect(paragraph).toBeInTheDocument();
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
      
      const helpText = screen.getByText(/Help text for/);
      expect(helpText).toHaveAttribute('id', 'help-text');
      
      const highlights = screen.getAllByText('test');
      expect(highlights.length).toBeGreaterThan(0);
    });

    it('should maintain focus management', () => {
      render(
        <HighlightText search="focus">
          <div>
            <input type="text" placeholder="Test focus input" />
            <button>Focus test button</button>
          </div>
        </HighlightText>
      );
      
      const input = screen.getByPlaceholderText('Test focus input');
      const button = screen.getByRole('button');
      
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      
      const highlights = screen.getAllByText('Focus');
      expect(highlights.length).toBe(1);
    });

    it('should work with screen readers (role attributes)', () => {
      render(
        <HighlightText search="content">
          <div>
            <main role="main">
              <article role="article">
                <h1>Main content area</h1>
                <p>Article content here</p>
              </article>
            </main>
            <aside role="complementary">
              <p>Sidebar content</p>
            </aside>
          </div>
        </HighlightText>
      );
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('complementary')).toBeInTheDocument();
      
      const highlights = screen.getAllByText('content');
      expect(highlights.length).toBe(3);
    });

    it('should handle high contrast mode styling', () => {
      const { container } = render(
        <HighlightText 
          search="contrast"
          highlightStyle={{
            backgroundColor: 'yellow',
            color: 'black'
          }}
        >
          <p>High contrast test</p>
        </HighlightText>
      );
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--highlight-bg-color')).toBe('yellow');
      expect(wrapper.style.getPropertyValue('--highlight-text-color')).toBe('black');
      
      const highlight = screen.getByText('contrast');
      expect(highlight).toHaveClass('highlight');
    });
  });

  describe('Performance', () => {
    it('should handle large text content efficiently', () => {
      const largeText = 'word '.repeat(1000);
      const startTime = performance.now();
      
      render(
        <HighlightText search="word">
          <div>{largeText}</div>
        </HighlightText>
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      expect(renderTime).toBeLessThan(200);
      
      const highlights = screen.getAllByText('word');
      expect(highlights.length).toBe(1000);
    });

    it('should handle multiple search terms efficiently', () => {
      const content = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!';
      
      const startTime = performance.now();
      
      render(
        <HighlightText search="quick">
          <p>{content}</p>
        </HighlightText>
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      expect(renderTime).toBeLessThan(50);
      
      expect(screen.getAllByText('quick')).toHaveLength(2);
    });

    it('should handle deep nesting without stack overflow', () => {
      let NestedComponent: React.ReactElement = <span>deeply nested content</span>;
      
      for (let i = 0; i < 100; i++) {
        NestedComponent = <div key={i}>{NestedComponent}</div>;
      }
      
      expect(() => {
        render(
          <HighlightText search="nested">
            {NestedComponent}
          </HighlightText>
        );
      }).not.toThrow();
      
      const highlight = screen.getByText('nested');
      expect(highlight).toHaveClass('highlight');
    });

    it('should have minimal re-renders with React.memo', () => {
      let renderCount = 0;
      
      const TestComponent = ({ search, content }: { search: string; content: string }) => {
        renderCount++;
        return (
          <HighlightText search={search}>
            <p>{content}</p>
          </HighlightText>
        );
      };
      
      const { rerender } = render(
        <TestComponent search="test" content="test content" />
      );
      
      const initialRenderCount = renderCount;
      
      rerender(<TestComponent search="test" content="test content" />);
      
      rerender(<TestComponent search="content" content="test content" />);
      expect(renderCount).toBe(initialRenderCount + 2);
      
      expect(screen.getByText('content')).toHaveClass('highlight');
    });
  });

  describe('Edge Cases & Error Handling', () => {
    it('should handle malformed regex gracefully', () => {
      expect(() => {
        render(
          <HighlightText search="[unclosed">
            <p>This should not break</p>
          </HighlightText>
        );
      }).not.toThrow();
      
      expect(() => {
        render(
          <HighlightText search="*invalid">
            <p>This should not break</p>
          </HighlightText>
        );
      }).not.toThrow();
    });

    it('should handle very long search terms', () => {
      const longSearchTerm = 'a'.repeat(1000);
      const content = `Start ${longSearchTerm} end`;
      
      expect(() => {
        render(
          <HighlightText search={longSearchTerm}>
            <p>{content}</p>
          </HighlightText>
        );
      }).not.toThrow();
      
      const highlight = screen.getByText(longSearchTerm);
      expect(highlight).toHaveClass('highlight');
    });

    it('should handle Unicode characters', () => {
      render(
        <HighlightText search="emoji">
          <p>Test emoji 🎉 content here</p>
        </HighlightText>
      );
      
      const highlight = screen.getByText('emoji');
      expect(highlight).toHaveClass('highlight');
      expect(screen.getByText(/🎉/)).toBeInTheDocument();
    });

    it('should handle special whitespace characters', () => {
      render(
        <HighlightText search="test">
          <p>test	with	tabs and  multiple  spaces</p>
        </HighlightText>
      );
      
      const highlight = screen.getByText('test');
      expect(highlight).toHaveClass('highlight');
      expect(screen.getByText(/with.*tabs/)).toBeInTheDocument();
    });

    it('should handle React fragments', () => {
      render(
        <HighlightText search="fragment">
          <>
            <p>First fragment part</p>
            <p>Second fragment part</p>
          </>
        </HighlightText>
      );
      
      const highlights = screen.getAllByText('fragment');
      expect(highlights).toHaveLength(2);
    });

    it('should handle component updates gracefully', () => {
      const { rerender } = render(
        <HighlightText search="initial">
          <p>initial content</p>
        </HighlightText>
      );
      
      expect(screen.getByText('initial')).toHaveClass('highlight');
      
      rerender(
        <HighlightText search="updated">
          <p>updated content</p>
        </HighlightText>
      );
      
      expect(screen.getByText('updated')).toHaveClass('highlight');
      expect(screen.queryByText('initial')).not.toBeInTheDocument();
    });
  });
});