import React, { ReactNode } from 'react';
import { processChildren, arePropsEqual, type ComponentProps } from './utils';
import './index.css';

export type TProps = ComponentProps;

const HighlightText = React.memo(({
    children,
    search,
    caseSensitive = false,
    className = 'highlight-text-container',
    highlightClassName = 'highlight',
    highlightStyle
}: TProps) => {
    const processedChildren = processChildren(children, search, caseSensitive, highlightClassName);

    const containerStyle = highlightStyle ? {
        '--highlight-bg-color': highlightStyle.backgroundColor,
        '--highlight-font-weight': highlightStyle.fontWeight,
        '--highlight-text-color': highlightStyle.color,
    } : {};

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