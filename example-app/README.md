# Passos para testar a biblioteca

## 1. Primeiro, faça o build da biblioteca

```bash
# No diretório raiz da biblioteca
cd C:\Users\diego\Documents\projects\highlight-text
npm run build
```

## 2. Instale as dependências do exemplo

```bash
# No diretório do exemplo
cd C:\Users\diego\Documents\projects\highlight-text\example-app
npm install
```

## 3. Instale a biblioteca local

```bash
# Ainda no diretório example-app
npm run install-local
```

## 4. Execute o projeto

```bash
npm start
```

O projeto será aberto em http://localhost:3000

## Funcionalidades testáveis:

- ✅ Busca básica com destaque
- ✅ Busca case-sensitive 
- ✅ Busca com regex (múltiplas palavras)
- ✅ Estilos customizados
- ✅ Teste interativo com input
- ✅ Diferentes exemplos de uso