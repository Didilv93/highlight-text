import React from 'react';

import './index.css';

export type TProps = {
    text: string;
    search: string;
    caseSensitive?: boolean;
    className?: string;
    highlightClassName?: string;
};

// Função pura sem dependências do React
function processText(text: string, search: string, caseSensitive: boolean = false) {
    if (!text || !search) return [{ type: 'text', content: text }];
    
    try {
        const flags = caseSensitive ? 'g' : 'gi';
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedSearch, flags);
        const parts: Array<{ type: 'text' | 'highlight', content: string }> = [];
        
        let lastIndex = 0;
        let match;
        
        // Reset regex lastIndex
        regex.lastIndex = 0;
        
        while ((match = regex.exec(text)) !== null) {
            // Add text before match
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.slice(lastIndex, match.index)
                });
            }
            
            // Add highlighted match
            parts.push({
                type: 'highlight',
                content: match[0]
            });
            
            lastIndex = match.index + match[0].length;
            
            // Prevent infinite loop
            if (match[0].length === 0) {
                regex.lastIndex++;
            }
        }
        
        // Add remaining text
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

// Componente React usando createElement diretamente para evitar problemas de JSX
const HighlightText = ({ 
    text, 
    search, 
    caseSensitive = false, 
    className = 'highlight-text-container',
    highlightClassName = 'highlight'
}: TProps) => {
    const parts = processText(text, search, caseSensitive);

    return React.createElement(
        'span',
        { className },
        ...parts.map((part, index) => {
            if (part.type === 'text') {
                return part.content;
            }
            return React.createElement(
                'span',
                { 
                    key: index, 
                    className: highlightClassName 
                },
                part.content
            );
        })
    );
};

export default HighlightText;