import React, { useState } from 'react';
import HighlightText from '@dspackages/highlight-text';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('React');
  const [caseSensitive, setCaseSensitive] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>HighlightText Component Demo</h1>
        
        <div className="controls">
          <div className="input-group">
            <label htmlFor="search">Search Term:</label>
            <input 
              id="search"
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter the term to highlight..."
            />
          </div>
          
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
              Case Sensitive
            </label>
          </div>
        </div>

        <div className="example">
          <h2>Example 1: Simple Text</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            This is an example of how to use React to create reusable components. 
            React is a very popular JavaScript library for web development.
          </HighlightText>
        </div>

        <div className="example">
          <h2>Example 2: Nested HTML</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            <div>
              <h3>Title with React</h3>
              <p>This paragraph contains <strong>React in bold</strong> and <em>react in italics</em>.</p>
              <ul>
                <li>Item 1: React is great</li>
                <li>Item 2: react hooks are useful</li>
                <li>Item 3: React components are reusable</li>
              </ul>
            </div>
          </HighlightText>
        </div>

        <div className="example">
          <h2>Example 3: Multiple Elements</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            <p>First paragraph with React.</p>
            <div>
              <span>Span with react</span>
              <br />
              <small>Small text: REACT in uppercase</small>
            </div>
            <blockquote>
              "React makes development easier" - Developer
            </blockquote>
          </HighlightText>
        </div>

        <div className="example">
          <h2>Example 4: Custom Style</h2>
          <HighlightText 
            search={searchTerm} 
            caseSensitive={caseSensitive}
            highlightClassName="custom-highlight-blue"
          >
            <div>
              <h4>React with blue highlight</h4>
              <p>All "react" terms in this block will have blue background.</p>
              <span>React, react, REACT - all highlighted!</span>
            </div>
          </HighlightText>
        </div>

        <div className="example">
          <h2>Example 5: Table</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            <table style={{border: '1px solid #ccc', borderCollapse: 'collapse', width: '100%'}}>
              <thead>
                <tr>
                  <th style={{border: '1px solid #ccc', padding: '8px'}}>Technology</th>
                  <th style={{border: '1px solid #ccc', padding: '8px'}}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>React</td>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>Library for interfaces</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>JavaScript</td>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>Programming language</td>
                </tr>
              </tbody>
            </table>
          </HighlightText>
        </div>
      </header>
    </div>
  );
}

export default App;