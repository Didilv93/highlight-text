import React, { ReactNode, ReactElement, cloneElement, isValidElement, useMemo, useCallback } from 'react';

import './index.css';

export type TProps = {
    children: ReactNode;
    search: string;
    caseSensitive?: boolean;
    className?: string;
    highlightClassName?: string;
    highlightStyle?: {
        backgroundColor?: string;
        fontWeight?: string;
        color?: string;
    };
};

function processText(text: string, search: string, caseSensitive: boolean = false) {
    if (!text || !search) return [{ type: 'text', content: text }];

    try {
        const flags = caseSensitive ? 'g' : 'gi';
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedSearch, flags);
        const parts: Array<{ type: 'text' | 'highlight', content: string }> = [];

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

function processTextNode(textContent: string, search: string, caseSensitive: boolean, highlightClassName: string): ReactNode[] {
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

function processChildren(children: ReactNode, search: string, caseSensitive: boolean, highlightClassName: string): ReactNode {
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

const arePropsEqual = (prevProps: TProps, nextProps: TProps): boolean => {
    if (
        prevProps.search !== nextProps.search ||
        prevProps.caseSensitive !== nextProps.caseSensitive ||
        prevProps.className !== nextProps.className ||
        prevProps.highlightClassName !== nextProps.highlightClassName
    ) {
        return false;
    }

    if (prevProps.highlightStyle !== nextProps.highlightStyle) {
        if (!prevProps.highlightStyle || !nextProps.highlightStyle) {
            return false;
        }

        if (
            prevProps.highlightStyle.backgroundColor !== nextProps.highlightStyle.backgroundColor ||
            prevProps.highlightStyle.color !== nextProps.highlightStyle.color ||
            prevProps.highlightStyle.fontWeight !== nextProps.highlightStyle.fontWeight
        ) {
            return false;
        }
    }

    if (prevProps.children !== nextProps.children) {
        return false;
    }

    return true;
};

const HighlightText = React.memo(({
    children,
    search,
    caseSensitive = false,
    className = 'highlight-text-container',
    highlightClassName = 'highlight',
    highlightStyle
}: TProps) => {
    const processedChildren = useMemo(() =>
        processChildren(children, search, caseSensitive, highlightClassName),
        [children, search, caseSensitive, highlightClassName]
    );

    const containerStyle: React.CSSProperties = useMemo(() => {
        if (!highlightStyle) return {};

        return {
            '--highlight-bg-color': highlightStyle.backgroundColor,
            '--highlight-font-weight': highlightStyle.fontWeight,
            '--highlight-text-color': highlightStyle.color,
        } as React.CSSProperties;
    }, [highlightStyle]);

    return React.createElement(
        'div',
        {
            className,
            style: containerStyle
        },
        processedChildren
    );
}, arePropsEqual);

HighlightText.displayName = 'HighlightText';

export default HighlightText;