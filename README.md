# Teste Front-End Econverse

Aplicação de e-commerce desenvolvida em React, TypeScript e Sass para o desafio técnico da Econverse.

## Tecnologias

- React 19
- TypeScript
- Vite
- Sass
- Vitest + React Testing Library
- Lucide React e React Icons

## Funcionalidades

- Vitrine de produtos com consumo de API e fallback local
- Carrosséis paginado, automático e por rolagem
- Modal de detalhes do produto
- Controle de quantidade e inclusão no carrinho
- Indicador de itens no carrinho
- Layout responsivo baseado no Figma
- HTML semântico e metadados básicos de SEO

## Como executar localmente

Clone o repositório:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

Acesse a pasta do projeto:

```bash
cd teste-front-end
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível no endereço mostrado pelo Vite.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa a análise estática |
| `npm test` | Executa os testes |
| `npm run test:watch` | Executa os testes em modo observação |

## Testes

Os testes cobrem:

- Normalização e fallback da API
- Exibição dos dados no card de produto
- Modal, quantidade e fechamento
- Inclusão de itens no carrinho
- Navegação do carrossel

Para executar os testes:

```bash
npm test
```

## Estrutura do projeto

```text
src/
├── components/   # Componentes visuais reutilizáveis
├── contexts/     # Estado compartilhado, como carrinho
├── hooks/        # Lógicas reutilizáveis
├── pages/        # Páginas da aplicação
├── sections/     # Seções compostas da home
├── services/     # Comunicação e normalização da API
├── test/         # Configuração dos testes
└── types/        # Tipos TypeScript
```

## Configuração da API

Em desenvolvimento, a aplicação usa o proxy do Vite.

Para sobrescrever a URL de produtos em outro ambiente, defina a variável abaixo antes de gerar o build:

```bash
VITE_PRODUCTS_URL=https://sua-api.com/produtos.json
```

## Autor

Desenvolvido por Vinicius Rocca para o processo seletivo da Econverse.
