import React, { ReactNode, ReactElement, cloneElement, isValidElement } from 'react';
import { processText } from './textProcessor';

export function processTextNode(textContent: string, search: string, caseSensitive: boolean, highlightClassName: string): ReactNode[] {
  const parts = processText(textContent, search, caseSensitive);

  return parts.map((part, index) => {
    if (part.type === 'text') {
      return part.content;
    }
    return React.createElement(
      'mark',
      {
        key: `highlight-${index}`,
        className: highlightClassName
      },
      part.content
    );
  });
}

export function processChildren(children: ReactNode, search: string, caseSensitive: boolean, highlightClassName: string): ReactNode {
  if (typeof children === 'string') {
    return processTextNode(children, search, caseSensitive, highlightClassName);
  }

  if (typeof children === 'number') {
    return processTextNode(children.toString(), search, caseSensitive, highlightClassName);
  }

  if (Array.isArray(children)) {
    return children.map((child, index) =>
      React.createElement(
        React.Fragment,
        { key: index },
        processChildren(child, search, caseSensitive, highlightClassName)
      )
    );
  }

  if (isValidElement(children)) {
    const element = children as ReactElement;

    if (element.props && element.props.children) {
      return cloneElement(element, {
        ...element.props,
        children: processChildren(element.props.children, search, caseSensitive, highlightClassName)
      });
    }

    return element;
  }

  return children;
}