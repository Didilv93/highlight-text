# Changelog

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

## [1.0.0] - 2025-10-24

### Added
- 🎉 **Lançamento inicial** da biblioteca highlight-text
- ✨ **Componente HighlightText** para destacar texto em aplicações React
- 🎨 **Estilos customizáveis** com classes CSS configuráveis
- 🔍 **Busca case-sensitive opcional**
- 🚀 **Suporte a regex** para buscas avançadas
- 📚 **TypeScript** com tipagem completa
- 📖 **Documentação completa** com exemplos