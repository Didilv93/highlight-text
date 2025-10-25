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
              placeholder="Digite o termo para destacar..."
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
          <h2>Exemplo 1: Texto Simples</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            Este é um exemplo de como usar React para criar componentes reutilizáveis. 
            O React é uma biblioteca JavaScript muito popular para desenvolvimento web.
          </HighlightText>
        </div>

        <div className="example">
          <h2>Exemplo 2: HTML Aninhado</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            <div>
              <h3>Título com React</h3>
              <p>Este parágrafo contém <strong>React em negrito</strong> e <em>react em itálico</em>.</p>
              <ul>
                <li>Item 1: React é ótimo</li>
                <li>Item 2: react hooks são úteis</li>
                <li>Item 3: Componentes React são reutilizáveis</li>
              </ul>
            </div>
          </HighlightText>
        </div>

        <div className="example">
          <h2>Exemplo 3: Múltiplos Elementos</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            <p>Primeiro parágrafo com React.</p>
            <div>
              <span>Span com react</span>
              <br />
              <small>Texto pequeno: REACT em maiúsculas</small>
            </div>
            <blockquote>
              "React torna o desenvolvimento mais fácil" - Desenvolvedor
            </blockquote>
          </HighlightText>
        </div>

        <div className="example">
          <h2>Exemplo 4: Estilo Customizado</h2>
          <HighlightText 
            search={searchTerm} 
            caseSensitive={caseSensitive}
            highlightClassName="custom-highlight-blue"
          >
            <div>
              <h4>React com destaque azul</h4>
              <p>Todos os termos "react" neste bloco ficarão com fundo azul.</p>
              <span>React, react, REACT - todos destacados!</span>
            </div>
          </HighlightText>
        </div>

        <div className="example">
          <h2>Exemplo 5: Tabela</h2>
          <HighlightText search={searchTerm} caseSensitive={caseSensitive}>
            <table style={{border: '1px solid #ccc', borderCollapse: 'collapse', width: '100%'}}>
              <thead>
                <tr>
                  <th style={{border: '1px solid #ccc', padding: '8px'}}>Tecnologia</th>
                  <th style={{border: '1px solid #ccc', padding: '8px'}}>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>React</td>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>Biblioteca para interfaces</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>JavaScript</td>
                  <td style={{border: '1px solid #ccc', padding: '8px'}}>Linguagem de programação</td>
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