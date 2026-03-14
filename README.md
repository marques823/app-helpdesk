# Documentação do Projeto Helpdesk Técnico Litoral

Este documento serve como um guia rápido para você continuar o desenvolvimento, edição e testes do aplicativo localmente.

## Descrição do Projeto

O **Helpdesk Técnico Litoral** é uma aplicação web moderna projetada para o gerenciamento eficiente de chamados de suporte técnico e atendimento ao cliente. Desenvolvida com **React**, a interface permite que usuários e equipes de suporte interajam de forma fluida, acompanhem o status de tickets, visualizem métricas em tempo real no dashboard e gerenciem perfis. 

O aplicativo se comunica com uma API backend (provavelmente em Django), utilizando um servidor Node.js intermediário para contornar restrições de CORS e gerenciar a autenticação baseada em cookies de sessão e CSRF de forma segura.

## Funcionalidades Principais

- **Autenticação Segura:** Login e Logout integrados com a API do backend, utilizando cookies de sessão (`SameSite=None; Secure`) e tokens CSRF.
- **Dashboard Analítico:** Visão geral com métricas de chamados (total, abertos, resolvidos, urgentes) e gráficos de distribuição por prioridade e categoria.
- **Gestão de Chamados (Tickets):** 
  - Listagem completa de chamados com filtros de status e prioridade.
  - Criação de novos chamados vinculados a empresas e categorias.
  - Visualização detalhada de cada chamado.
- **Interação e Histórico:** Sistema de mensagens/comentários dentro de cada chamado, permitindo a comunicação direta entre o usuário e a equipe de suporte.
- **Perfil de Usuário:** Visualização e edição de dados do usuário logado (nome, email, telefone, cargo/role e avatar).
- **Metadados Dinâmicos:** Carregamento dinâmico de empresas, categorias e funcionários diretamente da API para preenchimento de formulários.

---

## Arquitetura do Projeto

O projeto foi convertido para uma arquitetura **Full-Stack (Express + Vite)** para resolver problemas de CORS e cookies com a API de produção (`https://helpdesk.tecnicolitoral.com/api`).

- **Frontend:** React + Vite + Tailwind CSS.
- **Backend (Proxy):** Node.js + Express + `http-proxy-middleware`.

### Como funciona o Proxy?

O servidor Node.js (`server.ts`) atua como um intermediário.
1. O frontend faz requisições para `/api/...` (ex: `/api/auth/login/`).
2. O servidor Express intercepta essas requisições.
3. O `http-proxy-middleware` encaminha a requisição para `https://helpdesk.tecnicolitoral.com/api/...`.
4. Ele também reescreve os cabeçalhos `Origin` e `Referer` para enganar o backend, e ajusta os cookies (`SameSite=None; Secure`) para que o navegador os aceite.

## Como Executar Localmente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
Existem duas formas principais de rodar o projeto localmente:

#### A. Com Proxy (Simulando ambiente Web Legado)
O servidor Node.js atua como proxy para a API de produção:
```bash
npm run dev
```
Acesse em `http://localhost:3000`.

#### B. Sem Proxy (Simulando aplicativo Móvel)
Neste modo, o frontend fala diretamente com a API (via CORS). É ideal para testar como o app se comportará quando for empacotado para celular.
1. Crie ou edite o arquivo `.env.local`:
   ```bash
   VITE_API_URL=https://helpdesk.tecnicolitoral.com/api
   ```
2. Rode o Vite diretamente:
   ```bash
   npx vite --port 3000
   ```

### 3. Usando o Servidor de Mock (Testes Offline)
Para testar sem depender da API real:
1. Inicie o servidor de mock em um terminal:
   ```bash
   npx tsx mock-server.ts
   ```
2. Defina o `VITE_API_URL` no `.env.local`:
   ```bash
   VITE_API_URL=http://localhost:3001/api
   ```
3. Rode o frontend:
   ```bash
   npx vite --port 3000
   ```

## Estrutura de Arquivos Importantes

- `mock-server.ts`: Servidor Express leve que simula os endpoints da API para desenvolvimento offline.
- `src/services/api.ts`: Serviço central de comunicação. Agora suporta detecção automática de ambiente (Proxy vs CORS direto).
- `vite.config.ts`: Configuração do Vite, agora injeta `VITE_API_URL` dinamicamente.
- `.env.local`: Arquivo (não rastreado pelo git) para configurar sua URL de API local.

## Dicas de Desenvolvimento

1. **Erros de CORS ou Cookies:** Se você encontrar problemas de CORS ou se o login parar de funcionar, verifique a configuração do proxy no arquivo `server.ts`. O backend Django pode ser rigoroso com os cabeçalhos `Origin`, `Referer` e `X-CSRFToken`.
2. **Mock Data:** O arquivo `src/services/api.ts` contém dados falsos (`mockTickets`, `mockUser`). Se o aplicativo não conseguir se conectar à API (ou se você não estiver logado), ele retornará esses dados falsos para que você possa continuar desenvolvendo a interface.
3. **Logs do Proxy:** No terminal onde você rodou `npm run dev`, você verá logs como `Proxying request: /auth/login/`. Isso ajuda a confirmar se as requisições estão passando pelo servidor Node.js corretamente.
