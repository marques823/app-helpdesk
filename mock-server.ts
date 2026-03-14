import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.post('/api/auth/login/', (req, res) => {
  res.cookie('csrftoken', 'mock-csrf-token', { path: '/', sameSite: 'none', secure: true });
  res.cookie('sessionid', 'mock-session-id', { path: '/', sameSite: 'none', secure: true });
  res.json({ success: true, user: { username: 'tiago', is_staff: true } });
});

app.get('/api/auth/user/', (req, res) => {
  res.json({
    id: 1,
    username: 'tiago',
    first_name: 'Tiago',
    last_name: 'Nextweek',
    email: 'tiago@example.com',
    is_staff: true,
    is_superuser: true
  });
});

app.get('/api/dashboard/stats/', (req, res) => {
  res.json({
    total_tickets: 12,
    tickets_abertos: 5,
    tickets_resolvidos: 4,
    tickets_urgentes: 3,
    prioridade_data: {
      alta: { label: 'Alta', count: 3 },
      media: { label: 'Média', count: 6 },
      baixa: { label: 'Baixa', count: 3 }
    },
    categorias: []
  });
});

app.get('/api/mobile/tickets/', (req, res) => {
  res.json({
    results: [
      {
        id: "MOCK-1",
        titulo: "Instalação de software travada",
        prioridade: "alta",
        status: "aberto",
        criado_em: new Date().toISOString(),
        descricao: "O instalador do Office 365 para na metade e dá erro de rede.",
        criado_por: { username: "tiago" }
      },
      {
        id: "MOCK-2",
        titulo: "Solicitação de novo mouse",
        prioridade: "baixa",
        status: "em_andamento",
        criado_em: new Date().toISOString(),
        descricao: "Mouse parou de clicar no botão esquerdo.",
        criado_por: { username: "tiago" }
      }
    ]
  });
});

app.get('/api/meta/companies/', (req, res) => {
  res.json([
    { id: 1, nome: "Empresa de Teste A" },
    { id: 2, nome: "Empresa de Teste B" }
  ]);
});

app.get('/api/meta/categories/', (req, res) => {
  res.json([
    { id: 1, nome: "Hardware", icone: "💻", cor: "blue" },
    { id: 2, nome: "Software", icone: "💿", cor: "green" },
    { id: 3, nome: "Redes", icone: "🌐", cor: "purple" }
  ]);
});

app.listen(3001, () => console.log('Mock server running on http://localhost:3001'));
