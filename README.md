# @dspackages/highlight-text

Um componente React para destacar matches de texto com estilização customizável.

## 🚀 Instalação

```bash
npm install @dspackages/highlight-text
```

## 📝 Uso

```tsx
import HighlightText from '@dspackages/highlight-text';

function App() {
  return (
    <div>
      <HighlightText 
        text="Este é um exemplo de texto para destacar"
        search="exemplo"
      />
    </div>
  );
}
```

## ⚙️ Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `text` | `string` | - | O texto a ser renderizado |
| `search` | `string` | - | O termo a ser destacado |
| `caseSensitive` | `boolean` | `false` | Se a busca deve ser case-sensitive |
| `className` | `string` | `'highlight-text-container'` | Classe CSS do container |
| `highlightClassName` | `string` | `'highlight'` | Classe CSS dos highlights |

## 🎨 Customização de Estilo

O componente vem com estilos padrão, mas você pode customizar:

```css
/* Customizar o highlight */
.highlight {
  background-color: #your-color;
  color: #your-text-color;
  font-weight: bold;
}

/* Ou usar classes customizadas */
.my-custom-highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  padding: 2px 4px;
  border-radius: 3px;
}
```

```tsx
<HighlightText 
  text="Texto com estilo customizado"
  search="estilo"
  highlightClassName="my-custom-highlight"
/>
```

## 📋 Exemplos

### Busca case-sensitive
```tsx
<HighlightText 
  text="React e react são diferentes"
  search="React"
  caseSensitive={true}
/>
```

### Múltiplas palavras
```tsx
<HighlightText 
  text="JavaScript, TypeScript e React são tecnologias modernas"
  search="Script|React"
/>
```

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Build
npm run build

# Executar testes
npm test
```

## 📄 Licença

MIT © Diego Silva