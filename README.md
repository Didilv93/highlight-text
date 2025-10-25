# @dspackages/highlight-text

A React component wrapper that applies highlighting to any text content within `children` with customizable styling.

## ✨ Features

- 🎯 **Smart wrapper** - Applies highlighting to all content within the component
- 🏗️ **Structure preserved** - Maintains nested HTML elements intact
- 🎨 **Fully customizable** - Configurable CSS classes
- 🔍 **Advanced search** - Regex and case-sensitive support
- 📱 **Responsive** - Works with any HTML structure
- ⚡ **Performance optimized** - Smart and recursive processing
- 🔒 **TypeScript** - Complete typing included

## 🚀 Installation

```bash
npm install @dspackages/highlight-text
```

## 📝 Basic Usage

```tsx
import HighlightText from '@dspackages/highlight-text';

function App() {
  return (
    <HighlightText search="React">
      <div>
        <h1>Learning React</h1>
        <p>React is a JavaScript library for building user interfaces.</p>
        <ul>
          <li>React hooks are useful</li>
          <li>React components are reusable</li>
        </ul>
      </div>
    </HighlightText>
  );
}
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required** - Content where highlighting will be applied |
| `search` | `string` | - | **Required** - Term to be highlighted |
| `caseSensitive` | `boolean` | `false` | Whether the search should be case-sensitive |
| `className` | `string` | `'highlight-text-container'` | CSS class for the container |
| `highlightClassName` | `string` | `'highlight'` | CSS class for highlights |
| `highlightStyle` | `object` | `undefined` | **NEW** - Inline styles for highlights |

## 🎨 Usage Examples

### Simple Text
```tsx
<HighlightText search="important">
  This is an important message to highlight.
</HighlightText>
```

### Nested HTML
```tsx
<HighlightText search="JavaScript" caseSensitive={true}>
  <article>
    <h2>About JavaScript</h2>
    <p>JavaScript is a programming language.</p>
    <div>
      <strong>Modern JavaScript</strong> includes many features.
    </div>
  </article>
</HighlightText>
```

### Multiple Elements
```tsx
<HighlightText search="React|JavaScript" caseSensitive={false}>
  <div>
    <p>React makes development easier.</p>
    <span>JavaScript is fundamental.</span>
    <ul>
      <li>React hooks</li>
      <li>JavaScript ES6+</li>
    </ul>
  </div>
</HighlightText>
```

### Tables and Complex Structures
```tsx
<HighlightText search="data">
  <table>
    <thead>
      <tr>
        <th>Personal Data</th>
        <th>Information</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>User data</td>
      </tr>
    </tbody>
  </table>
</HighlightText>
```

## 🎨 Style Customization

### Default CSS
The component comes with default styles that you can override:

```css
.highlight {
  background-color: #FFC70A;
  color: #000000;
  font-weight: bold;
}
```

### Custom Styles
```css
.my-custom-highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  padding: 2px 6px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
}

.highlight-blue {
  background-color: #007bff;
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
}
```

```tsx
<HighlightText 
  search="highlight"
  highlightClassName="my-custom-highlight"
>
  <p>Text with beautiful custom highlight!</p>
</HighlightText>
```

### Style via Props (NEW)
You can now customize highlight colors directly via props without CSS:

```tsx
<HighlightText 
  search="highlight"
  highlightStyle={{
    backgroundColor: '#e91e63',
    color: '#ffffff',
  }}
>
  <p>Text with pink highlight using props!</p>
</HighlightText>
```

Available style options:
- `backgroundColor`: Background color of highlights
- `color`: Text color of highlights  

```tsx
// Green theme example
<HighlightText 
  search="important"
  highlightStyle={{
    backgroundColor: '#4caf50',
    color: '#000000',
  }}
>
  <p>This important message has green highlights.</p>
</HighlightText>
```

## 🔍 Advanced Search

### Case Sensitive
```tsx
<HighlightText search="React" caseSensitive={true}>
  <p>React is different from react when case-sensitive is active.</p>
</HighlightText>
```

### Regex (Multiple Words)
```tsx
<HighlightText search="React|JavaScript|TypeScript">
  <div>
    <p>React, JavaScript and TypeScript are modern technologies.</p>
    <span>All three words will be highlighted automatically.</span>
  </div>
</HighlightText>
```

### Complex Patterns
```tsx
<HighlightText search="\\b\\w+Script\\b">
  <p>JavaScript, TypeScript and ActionScript will be highlighted.</p>
</HighlightText>
```

## 🏗️ How It Works

The component works recursively:

1. **Analyzes content** - Traverses all child elements
2. **Identifies text** - Finds text nodes within the structure
3. **Applies highlighting** - Replaces matches with `<span>` elements with CSS class
4. **Preserves structure** - Maintains all original HTML elements
5. **Rebuilds tree** - Returns complete structure with applied highlights

```tsx
// Input:
<HighlightText search="React">
  <div>
    <h1>Title about React</h1>
    <p>React is great</p>
  </div>
</HighlightText>

// Output (rendered):
<div className="highlight-text-container">
  <div>
    <h1>Title about <span className="highlight">React</span></h1>
    <p><span className="highlight">React</span> is great</p>
  </div>
</div>
```

## 📋 Use Cases

### ✅ Ideal for:
- **Search results** - Highlight found terms
- **Documentation** - Highlight keywords
- **Tutorials** - Emphasize important concepts
- **Blogs** - Highlight technical terms
- **Dashboards** - Highlight important metrics
- **E-learning** - Highlight concepts in lessons

### ⚠️ Considerations:
- For very large texts (>10MB), consider pagination
- Complex regex patterns may impact performance
- Elements with event listeners are preserved

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build library
npm run build

# Run example
cd example-app
npm install
npm start
```

## 📄 Migration from v1.x

### Main changes:
- **Props**: `text` → `children`
- **Functionality**: Now works with any HTML content
- **Flexibility**: Complete support for nested structures

### Before (v1.x):
```tsx
<HighlightText 
  text="Text to highlight words"
  search="words"
/>
```

### After (v2.x):
```tsx
<HighlightText search="words">
  Text to highlight words
</HighlightText>
```

## 📄 License

MIT © Diego Silva

---

### 🔗 Links
- [GitHub](https://github.com/Didilv93/highlight-text)
- [npm](https://www.npmjs.com/package/@dspackages/highlight-text)
- [Issues](https://github.com/Didilv93/highlight-text/issues)