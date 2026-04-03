# Teste Front-End Econverse

Projeto desenvolvido em **React + TypeScript + Sass** para o desafio técnico de Front-End da Econverse, com foco em fidelidade ao layout do Figma, componentização e boas práticas de código.

## Visão geral

A aplicação reproduz a home de e-commerce solicitada no desafio, incluindo:

- Header completo com menu e busca
- Banner principal
- Faixa de categorias
- Vitrine de produtos
- Modal de detalhes do produto
- Seções de parceiros e marcas
- Footer com newsletter e links institucionais

## Tecnologias

- React 19
- TypeScript
- Vite
- Sass (SCSS)
- Lucide React (ícones)
- React Icons (ícones sociais)

## Requisitos do desafio atendidos

- Desenvolvimento em React + TypeScript
- Consumo de produtos via JSON da Econverse
- Modal com interação ao clicar no produto
- Uso de pré-processador Sass
- Sem uso de bibliotecas UI (Bootstrap/Foundation/etc.)
- Estrutura componentizada
- Organização de código por seções e componentes
- SEO básico (lang, title, meta description)
- HTML semântico em pontos-chave (main, section, article, nav, buttons acessíveis)

## Como executar localmente

### 1. Pré-requisitos

- Node.js 18+ (recomendado)
- npm 9+

### 2. Instalação

```bash
npm install
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível no endereço exibido pelo Vite (normalmente `http://localhost:5173`).

## Comandos úteis

### Lint

```bash
npm run lint
```

### Build de produção

```bash
npm run build -- --configLoader native
```

### Preview do build

```bash
npm run preview
```

## Arquitetura do projeto

```text
src/
├── assets/
│   └── images/
├── components/
│   ├── Banner/
│   ├── CategoryStrip/
│   ├── Footer/
│   ├── Header/
│   ├── ProductCard/
│   ├── ProductModal/
│   └── shared/
├── pages/
│   └── Home/
├── sections/
├── services/
│   └── api.ts
├── styles/
│   └── global.scss
└── types/
```

## Destaques técnicos

- Componentes reutilizáveis para títulos de seção, setas, bolhas de marca e colunas de links
- Modal com fechamento por clique fora e tecla `ESC`
- Cartões de produto com fallback de imagem
- Carrossel de produtos paginado com controle por breakpoint
- Organização visual consistente com uso de variáveis e classes por contexto

## Observações

- O projeto foi construído com foco em fidelidade visual ao layout de referência e experiência de uso.
- O favicon foi personalizado com a identidade visual da Econverse.

## Autor

Desenvolvido por **Vinicius Rocca** para o processo seletivo de Front-End da Econverse.

