import React, { useState } from 'react';
import HighlightText from '@dspackages/highlight-text';

function App() {
  const [searchTerm, setSearchTerm] = useState('exemplo');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const sampleTexts = [
    "Este é um exemplo de texto para destacar palavras importantes no React.",
    "JavaScript, TypeScript e React são tecnologias modernas para desenvolvimento web.",
    "O HighlightText é uma biblioteca muito útil para destacar termos em textos.",
    "React hooks como useState e useEffect facilitam o desenvolvimento de componentes."
  ];

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', fontSize: '2.5rem' }}>
          📝 HighlightText - Demonstração
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>
          Teste interativo da biblioteca @dspackages/highlight-text
        </p>
      </header>

      {/* Controles de busca */}
      <div className="example-section">
        <h3>🔍 Configurações de Busca</h3>
        <input
          type="text"
          className="search-input"
          placeholder="Digite o termo para destacar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          Case Sensitive
        </label>
      </div>

      {/* Exemplos básicos */}
      <div className="example-section">
        <h3>📋 Exemplos Básicos</h3>
        {sampleTexts.map((text, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div className="result-text">
              <HighlightText
                text={text}
                search={searchTerm}
                caseSensitive={caseSensitive}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Exemplo com regex */}
      <div className="example-section">
        <h3>🔧 Busca com Regex</h3>
        <p>Busca múltipla: <code>React|JavaScript|TypeScript</code></p>
        <div className="result-text">
          <HighlightText
            text="Desenvolver aplicações modernas com React, JavaScript e TypeScript é muito produtivo!"
            search="React|JavaScript|TypeScript"
            caseSensitive={caseSensitive}
          />
        </div>
      </div>

      {/* Exemplos com estilos customizados */}
      <div className="example-section">
        <h3>🎨 Estilos Customizados</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>Gradiente colorido:</h4>
          <div className="result-text">
            <HighlightText
              text="Este texto tem um destaque customizado muito bonito!"
              search="destaque customizado"
              highlightClassName="custom-highlight"
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>Estilo azul:</h4>
          <div className="result-text">
            <HighlightText
              text="Biblioteca de componentes React para destacar texto"
              search="React"
              highlightClassName="blue-highlight"
            />
          </div>
        </div>

        <div>
          <h4>Estilo verde:</h4>
          <div className="result-text">
            <HighlightText
              text="Performance otimizada com useMemo para evitar re-renders desnecessários"
              search="Performance|useMemo"
              highlightClassName="green-highlight"
            />
          </div>
        </div>
      </div>

      {/* Exemplo sem busca */}
      <div className="example-section">
        <h3>🚫 Sem Termo de Busca</h3>
        <p>Quando não há termo de busca, o texto é exibido normalmente:</p>
        <div className="result-text">
          <HighlightText
            text="Este texto não possui nenhum termo destacado."
            search=""
          />
        </div>
      </div>

      {/* Rodapé */}
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <p>
          🚀 Biblioteca criada por Diego Silva | 
          <a href="https://github.com/Didilv93/highlight-text" style={{ color: '#007acc', marginLeft: '8px' }}>
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;