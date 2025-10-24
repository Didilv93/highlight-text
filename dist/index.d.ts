import React from 'react';
import './index.css';
export type TProps = {
    text: string;
    search: string;
    caseSensitive?: boolean;
    className?: string;
    highlightClassName?: string;
};
declare const HighlightText: ({ text, search, caseSensitive, className, highlightClassName }: TProps) => React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export default HighlightText;
