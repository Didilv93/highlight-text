# @dspackages/highlight-text

Um componente React wrapper que aplica highlight em qualquer conteúdo de texto dentro de `children` com estilização customizável.

## ✨ Características

- 🎯 **Wrapper inteligente** - Aplica highlight em todo conteúdo dentro do componente
- 🏗️ **Estrutura preservada** - Mantém elementos HTML aninhados intactos
- 🎨 **Totalmente customizável** - Classes CSS configuráveis
- 🔍 **Busca avançada** - Suporte a regex e case-sensitive
- 📱 **Responsivo** - Funciona em qualquer estrutura HTML
- ⚡ **Performance otimizada** - Processamento inteligente e recursivo
- 🔒 **TypeScript** - Tipagem completa incluída

## 🚀 Instalação

```bash
npm install @dspackages/highlight-text
```

## 📝 Uso Básico

```tsx
import HighlightText from '@dspackages/highlight-text';

function App() {
  return (
    <HighlightText search="React">
      <div>
        <h1>Aprendendo React</h1>
        <p>React é uma biblioteca JavaScript para criar interfaces.</p>
        <ul>
          <li>React hooks são úteis</li>
          <li>Componentes React são reutilizáveis</li>
        </ul>
      </div>
    </HighlightText>
  );
}
```

## ⚙️ Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | `ReactNode` | - | **Obrigatório** - Conteúdo onde será aplicado o highlight |
| `search` | `string` | - | **Obrigatório** - Termo a ser destacado |
| `caseSensitive` | `boolean` | `false` | Se a busca deve ser case-sensitive |
| `className` | `string` | `'highlight-text-container'` | Classe CSS do container |
| `highlightClassName` | `string` | `'highlight'` | Classe CSS dos highlights |

## 🎨 Exemplos de Uso

### Texto Simples
```tsx
<HighlightText search="importante">
  Esta é uma mensagem importante para destacar.
</HighlightText>
```

### HTML Aninhado
```tsx
<HighlightText search="JavaScript" caseSensitive={true}>
  <article>
    <h2>Sobre JavaScript</h2>
    <p>JavaScript é uma linguagem de programação.</p>
    <div>
      <strong>JavaScript moderno</strong> inclui muitas funcionalidades.
    </div>
  </article>
</HighlightText>
```

### Múltiplos Elementos
```tsx
<HighlightText search="React|JavaScript" caseSensitive={false}>
  <div>
    <p>React facilita o desenvolvimento.</p>
    <span>JavaScript é fundamental.</span>
    <ul>
      <li>React hooks</li>
      <li>JavaScript ES6+</li>
    </ul>
  </div>
</HighlightText>
```

### Tabelas e Estruturas Complexas
```tsx
<HighlightText search="dados">
  <table>
    <thead>
      <tr>
        <th>Dados Pessoais</th>
        <th>Informação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Nome</td>
        <td>Dados do usuário</td>
      </tr>
    </tbody>
  </table>
</HighlightText>
```

## 🎨 Customização de Estilo

### CSS Padrão
O componente vem com estilos padrão que você pode sobrescrever:

```css
.highlight {
  background-color: #FFC70A;
  color: #000000;
  font-weight: bold;
}
```

### Estilos Customizados
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
  search="destaque"
  highlightClassName="my-custom-highlight"
>
  <p>Texto com destaque customizado muito bonito!</p>
</HighlightText>
```

## � Busca Avançada

### Case Sensitive
```tsx
<HighlightText search="React" caseSensitive={true}>
  <p>React é diferente de react quando case-sensitive está ativo.</p>
</HighlightText>
```

### Regex (Múltiplas Palavras)
```tsx
<HighlightText search="React|JavaScript|TypeScript">
  <div>
    <p>React, JavaScript e TypeScript são tecnologias modernas.</p>
    <span>Todas as três palavras serão destacadas automaticamente.</span>
  </div>
</HighlightText>
```

### Padrões Complexos
```tsx
<HighlightText search="\\b\\w+Script\\b">
  <p>JavaScript, TypeScript e ActionScript serão destacados.</p>
</HighlightText>
```

## 🏗️ Como Funciona

O componente funciona recursivamente:

1. **Analisa o conteúdo** - Percorre todos os elementos filhos
2. **Identifica texto** - Encontra nós de texto dentro da estrutura
3. **Aplica highlight** - Substitui matches por elementos `<span>` com classe CSS
4. **Preserva estrutura** - Mantém todos os elementos HTML originais
5. **Reconstrói árvore** - Retorna a estrutura completa com highlights aplicados

```tsx
// Entrada:
<HighlightText search="React">
  <div>
    <h1>Título sobre React</h1>
    <p>React é ótimo</p>
  </div>
</HighlightText>

// Saída (renderizada):
<div className="highlight-text-container">
  <div>
    <h1>Título sobre <span className="highlight">React</span></h1>
    <p><span className="highlight">React</span> é ótimo</p>
  </div>
</div>
```

## 📋 Casos de Uso

### ✅ Ideal para:
- **Resultados de busca** - Destacar termos encontrados
- **Documentação** - Destacar palavras-chave
- **Tutorials** - Enfatizar conceitos importantes
- **Blogs** - Highlight de termos técnicos
- **Dashboards** - Destacar métricas importantes
- **E-learning** - Destacar conceitos em lições

### ⚠️ Considerações:
- Para textos muito grandes (>10MB), considere paginação
- Regex complexas podem impactar performance
- Elementos com event listeners são preservados

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Build da biblioteca
npm run build

# Executar exemplo
cd example-app
npm install
npm start
```

## 📄 Migração da v1.x

### Mudanças principais:
- **Props**: `text` → `children`
- **Funcionalidade**: Agora funciona com qualquer conteúdo HTML
- **Flexibilidade**: Suporte completo a estruturas aninhadas

### Antes (v1.x):
```tsx
<HighlightText 
  text="Texto para destacar palavras"
  search="palavras"
/>
```

### Depois (v2.x):
```tsx
<HighlightText search="palavras">
  Texto para destacar palavras
</HighlightText>
```

## 📄 Licença

MIT © Diego Silva

---

### 🔗 Links
- [GitHub](https://github.com/Didilv93/highlight-text)
- [npm](https://www.npmjs.com/package/@dspackages/highlight-text)
- [Issues](https://github.com/Didilv93/highlight-text/issues)