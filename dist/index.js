"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./index.css");
const apply = ({ text, search }) => {
    let result = [];
    try {
        const matchs = [...text.matchAll(new RegExp(search, 'gi'))];
        if (!matchs.length)
            return [() => (react_1.default.createElement(react_1.default.Fragment, null, text))];
        matchs.forEach((match, index) => {
            const matchIndex = match.index || 0;
            result = result.concat([
                () => (react_1.default.createElement(react_1.default.Fragment, null, match.input?.slice(matchs[index - 1] ? matchIndex : 0, matchIndex))),
                () => (react_1.default.createElement("span", { className: "highlight", key: `mach#${matchIndex}` }, match[0])),
                () => (react_1.default.createElement(react_1.default.Fragment, null, match.input?.slice(matchIndex + search.length, matchs[index + 1]?.index))),
            ]);
        });
        return result;
    }
    catch (_) {
        return [() => (react_1.default.createElement(react_1.default.Fragment, null, text))];
    }
};
exports.default = ({ text, search }) => {
    if (!text || !search)
        return (react_1.default.createElement(react_1.default.Fragment, null, text));
    const textHighlighted = (0, react_1.useMemo)(() => (apply({ text, search })), [text, search]);
    return (react_1.default.createElement("span", null, textHighlighted.map((Content, index) => (react_1.default.createElement(Content, { key: `text-highlight#${index}` })))));
};
