# Como usar em seus projetos React

## 1. Instalação (quando publicado)

```bash
npm install @dspackages/highlight-text
```

## 2. Uso básico

```tsx
import React from 'react';
import HighlightText from '@dspackages/highlight-text';

function App() {
  return (
    <div>
      <h1>Meu App</h1>
      <HighlightText 
        text="Aqui está um texto de exemplo para demonstrar o highlight"
        search="exemplo"
      />
    </div>
  );
}

export default App;
```

## 3. Uso local (desenvolvimento)

Para usar enquanto desenvolve:

```bash
# No diretório da sua biblioteca
npm run build

# No seu projeto React
npm install file:../caminho/para/highlight-text
```

## 4. Propriedades disponíveis

- `text`: string - O texto a ser renderizado
- `search`: string - O termo a ser destacado (suporta regex)
- `caseSensitive`: boolean (opcional) - Busca case-sensitive
- `className`: string (opcional) - Classe CSS do container
- `highlightClassName`: string (opcional) - Classe CSS dos highlights

## 5. Personalização de estilo

```css
/* Seus estilos customizados */
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
  text="Texto com estilo personalizado"
  search="personalizado"
  highlightClassName="my-highlight"
/>
```