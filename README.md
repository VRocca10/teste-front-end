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

## Como executar

```bash
npm install
npm run dev
```

A aplicação ficará disponível no endereço mostrado pelo Vite.

<<<<<<< HEAD
### Endpoint de produtos

Em desenvolvimento, a API é acessada pelo proxy configurado no Vite. Em produção, é usada a URL pública da Econverse. Caso a hospedagem exija outro endpoint ou proxy, defina `VITE_PRODUCTS_URL` no ambiente de build.

## Comandos úteis
=======
## Scripts
>>>>>>> 54e068780ac69d3c6588566d9e90c8c4601d4aab

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

Em desenvolvimento, a aplicação usa o proxy do Vite. Para sobrescrever a URL de produtos em outro ambiente, defina:

```bash
VITE_PRODUCTS_URL=https://sua-api.com/produtos.json
```

## Autor

Desenvolvido por Vinicius Rocca para o processo seletivo da Econverse.
