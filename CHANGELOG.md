# Changelog

## [2.0.0] - 2025-10-25

### 🚀 **BREAKING CHANGES**
- **API completamente reformulada** - Agora funciona como wrapper com `children` em vez de prop `text`
- **Funcionalidade expandida** - Suporte completo a estruturas HTML aninhadas
- **Maior flexibilidade** - Funciona com qualquer tipo de conteúdo React

### ✨ **Added**
- 🎯 **Wrapper inteligente** - Aplica highlight em todo conteúdo dentro do componente
- 🏗️ **Processamento recursivo** - Percorre e processa elementos HTML aninhados
- 📱 **Suporte universal** - Funciona com textos, elementos, tabelas, listas, etc.
- ⚡ **Performance otimizada** - Algoritmo melhorado para estruturas complexas
- 🔍 **Preservação de estrutura** - Mantém todos os elementos e props originais

### 🔄 **Changed**
- **Props principais**: `text` → `children` (BREAKING)
- **Container padrão**: `<span>` → `<div>` para melhor compatibilidade
- **Processamento**: Single string → Recursive children processing
- **Flexibilidade**: Texto simples → Qualquer conteúdo React

### 🛠️ **Technical**
- Implementado processamento recursivo com `cloneElement`
- Adicionado suporte a `ReactElement`, arrays, e tipos primitivos
- Melhorado tratamento de edge cases
- Otimizado algoritmo de busca e substituição

### 📖 **Documentation**
- **README completamente reescrito** com novos exemplos
- **Casos de uso expandidos** - tabelas, listas, HTML complexo
- **Guia de migração** da v1.x para v2.x
- **Exemplos avançados** com regex e estruturas aninhadas

### 🔧 **Migration Guide**
```tsx
// v1.x (OLD)
<HighlightText text="Meu texto" search="texto" />

// v2.x (NEW)
<HighlightText search="texto">
  Meu texto
</HighlightText>
```

---

## [1.0.1] - 2025-10-24

### Fixed
- 🐛 **Resolvido erro "Invalid hook call"** - Removido `useMemo` que causava conflitos com múltiplas instâncias do React
- 🔧 **Eliminados problemas de compatibilidade** - Substituído JSX por `React.createElement` para máxima compatibilidade
- ⚡ **Melhorada estabilidade** - Função de processamento de texto agora é completamente pura
- 🛠️ **Corrigidos problemas de build** - Configuração otimizada para distribuição

### Changed
- 📦 **Arquitetura simplificada** - Componente mais leve e sem dependências internas do React
- 🎯 **Melhor performance** - Processamento de texto otimizado
- 🔒 **Maior estabilidade** - Eliminados side effects e dependências problemáticas

### Technical
- Removido `useMemo` hook
- Implementada função pura `processText`
- Substituído JSX por `React.createElement`
- Melhorada configuração de build
- Adicionado tratamento robusto de regex

---

## [1.0.0] - 2025-10-24

### Added
- 🎉 **Lançamento inicial** da biblioteca highlight-text
- ✨ **Componente HighlightText** para destacar texto em aplicações React
- 🎨 **Estilos customizáveis** com classes CSS configuráveis
- 🔍 **Busca case-sensitive opcional**
- 🚀 **Suporte a regex** para buscas avançadas
- 📚 **TypeScript** com tipagem completa
- 📖 **Documentação completa** com exemplos