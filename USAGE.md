# How to use in your React projects

## 1. Installation (when published)

```bash
npm install @dspackages/highlight-text
```

## 2. Basic usage

```tsx
import React from 'react';
import HighlightText from '@dspackages/highlight-text';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <HighlightText 
        text="Here is an example text to demonstrate the highlight"
        search="example"
      />
    </div>
  );
}

export default App;
```

## 3. Local usage (development)

For use while developing:

```bash
# In your library directory
npm run build

# In your React project
npm install file:../path/to/highlight-text
```

## 4. Available properties

- `text`: string - The text to be rendered
- `search`: string - The term to be highlighted (supports regex)
- `caseSensitive`: boolean (optional) - Case-sensitive search
- `className`: string (optional) - Container CSS class
- `highlightClassName`: string (optional) - Highlights CSS class

## 5. Style customization

```css
/* Your custom styles */
.my-highlight {
  background-color: #ffeb3b;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
  padding: 1px 3px;
}
```

```tsx
<HighlightText 
  text="Text with custom style"
  search="custom"
  highlightClassName="my-highlight"
/>
```