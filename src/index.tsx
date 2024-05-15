import React, { useMemo } from 'react';

import './index.css';

export type TProps = {
    text: string;
    search: string;
};

const apply = ({ text, search }: TProps) => {
    let result: React.FC[] = [];
    try {
        const matchs = [...text.matchAll(new RegExp(search, 'gi'))];
        if (!matchs.length) return [() => (<>{text}</>)];
        matchs.forEach((match, index) => {
            const matchIndex = match.index || 0;
            result = result.concat([
                () => (<>{match.input?.slice(matchs[index - 1] ? matchIndex : 0, matchIndex)}</>),
                () => (
                    <span className="highlight" key={`mach#${matchIndex}`}>{match[0]}</span>
                ),
                () => (<>{match.input?.slice(matchIndex + search.length, matchs[index + 1]?.index)}</>),
            ]);
        });
        return result;
    } catch (_) {
        return [() => (<>{text}</>)];
    }
};

export default ({ text, search }: TProps) => {
    if (!text || !search) return (<>{text}</>);
    const textHighlighted = useMemo(() => (apply({ text, search })), [text, search]);
    return (
        <span>
            {textHighlighted.map((Content, index) => (
                <Content key={`text-highlight#${index}`} />
            ))}
        </span>
    );
};