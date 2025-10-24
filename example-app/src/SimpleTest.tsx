import React from 'react';

// Versão simplificada para teste
function SimpleTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🔍 Teste Simples</h1>
      <p>Se você vê esta mensagem, o React está funcionando.</p>
      
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Teste sem biblioteca:</h3>
        <span>
          Este é um <span style={{ backgroundColor: '#FFC70A', padding: '2px' }}>exemplo</span> simples
        </span>
      </div>
      
      <div style={{ background: '#e8f4fd', padding: '10px', margin: '10px 0' }}>
        <h3>Status da importação:</h3>
        <p>Tentando importar a biblioteca...</p>
        <TestLibraryImport />
      </div>
    </div>
  );
}

function TestLibraryImport() {
  try {
    // Importação dinâmica para testar
    const HighlightText = require('@dspackages/highlight-text').default;
    
    return (
      <div>
        <p>✅ Biblioteca importada com sucesso!</p>
        <HighlightText 
          text="Teste básico de funcionamento"
          search="básico"
        />
      </div>
    );
  } catch (error) {
    const err = error as Error;
    return (
      <div style={{ color: 'red' }}>
        <p>❌ Erro na importação da biblioteca:</p>
        <p>{err.message}</p>
      </div>
    );
  }
}

export default SimpleTest;