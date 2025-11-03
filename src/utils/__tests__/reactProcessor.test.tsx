import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { processTextNode, processChildren } from '../reactProcessor';

describe('React Processor Utils', () => {
  describe('processTextNode', () => {
    it('should create text and mark elements', () => {
      const result = processTextNode('hello world', 'world', false, 'highlight');
      const container = document.createElement('div');
      
      React.Children.toArray(result).forEach(child => {
        if (typeof child === 'string') {
          container.appendChild(document.createTextNode(child));
        } else if (React.isValidElement(child)) {
          const span = document.createElement('span');
          span.innerHTML = child.props.children;
          container.appendChild(span);
        }
      });
      
      expect(container.textContent).toBe('hello world');
    });

    it('should handle empty text', () => {
      const result = processTextNode('', 'search', false, 'highlight');
      expect(result).toEqual(['']);
    });

    it('should handle text with no matches', () => {
      const result = processTextNode('hello world', 'xyz', false, 'highlight');
      expect(result).toEqual(['hello world']);
    });

    it('should apply correct highlight class', () => {
      const result = processTextNode('test word', 'test', false, 'custom-highlight');
      const highlightElement = result.find(item => 
        React.isValidElement(item) && item.props.className === 'custom-highlight'
      );
      expect(highlightElement).toBeDefined();
    });
  });

  describe('processChildren', () => {
    it('should process string children', () => {
      const TestComponent = () => (
        <div>{processChildren('hello world', 'world', false, 'highlight')}</div>
      );
      
      render(<TestComponent />);
      expect(screen.getByText('world')).toBeInTheDocument();
      expect(screen.getByText('world').tagName).toBe('MARK');
    });

    it('should process number children', () => {
      const TestComponent = () => (
        <div>{processChildren(123456, '123', false, 'highlight')}</div>
      );
      
      render(<TestComponent />);
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(screen.getByText('123').tagName).toBe('MARK');
    });

    it('should process array children', () => {
      const TestComponent = () => (
        <div>{processChildren(['first', 'second'], 'first', false, 'highlight')}</div>
      );
      
      render(<TestComponent />);
      expect(screen.getByText('first')).toBeInTheDocument();
      expect(screen.getByText('first').tagName).toBe('MARK');
    });

    it('should process React element children', () => {
      const element = <span>hello world</span>;
      const TestComponent = () => (
        <div>{processChildren(element, 'world', false, 'highlight')}</div>
      );
      
      render(<TestComponent />);
      expect(screen.getByText('world')).toBeInTheDocument();
      expect(screen.getByText('world').tagName).toBe('MARK');
      
      const span = screen.getByText('hello').closest('span');
      expect(span).toBeInTheDocument();
      expect(span?.tagName).toBe('SPAN');
    });

    it('should preserve element attributes', () => {
      const element = <a href="https://example.com" className="link">test link</a>;
      const TestComponent = () => (
        <div>{processChildren(element, 'test', false, 'highlight')}</div>
      );
      
      render(<TestComponent />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveClass('link');
      expect(screen.getByText('test')).toHaveClass('highlight');
    });

    it('should handle nested elements', () => {
      const element = (
        <div>
          <span>
            <strong>nested test content</strong>
          </span>
        </div>
      );
      
      const TestComponent = () => (
        <div>{processChildren(element, 'test', false, 'highlight')}</div>
      );
      
      const { container } = render(<TestComponent />);
      expect(screen.getByText('test')).toHaveClass('highlight');
      
      const strong = container.querySelector('strong');
      expect(strong).toBeInTheDocument();
    });

    it('should handle null and undefined children', () => {
      const TestComponent = () => (
        <div>
          {processChildren(null, 'test', false, 'highlight')}
          {processChildren(undefined, 'test', false, 'highlight')}
          {processChildren('valid', 'valid', false, 'highlight')}
        </div>
      );
      
      render(<TestComponent />);
      expect(screen.getByText('valid')).toBeInTheDocument();
    });

    it('should handle elements without children', () => {
      const element = <img src="test.jpg" alt="test" />;
      const TestComponent = () => (
        <div>{processChildren(element, 'test', false, 'highlight')}</div>
      );
      
      render(<TestComponent />);
      expect(screen.getByAltText('test')).toBeInTheDocument();
    });
  });
});