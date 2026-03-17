// This is the API service.
// It uses VITE_API_URL if available, otherwise falls back to mock data.

export interface DashboardStats {
  total_tickets: number;
  tickets_abertos: number;
  tickets_resolvidos: number;
  tickets_urgentes: number;
  prioridade_data: {
    [key: string]: { label: string; count: number };
  };
  categorias: Array<{
    id: number;
    nome: string;
    cor: string;
    icone: string;
    total: number;
    abertos: number;
    fechados: number;
    porcentagem_fechados: number;
  }>;
  tickets: Array<{
    id: number;
    titulo: string;
    status: string;
    prioridade: string;
    empresa: { nome: string } | null;
    categoria: { nome: string; cor: string; icone: string } | null;
    criado_por: { username: string };
    atribuido_a: { usuario: { username: string } } | null;
    criado_em: string;
  }>;
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "closed";
  description: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
  user: {
    name: string;
    avatar: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TK-4092",
    subject: "Queda de servidor na Região Norte",
    category: "technical",
    priority: "high",
    status: "open",
    description: "Usuário relata que não consegue acessar a plataforma após a última atualização. A tela de carregamento fica travada indefinidamente após inserir as credenciais corretas.",
    createdAt: "2023-10-12T14:30:00Z",
    updatedAt: "2023-10-12T15:45:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        content: "Ainda não consigo acessar. Já limpei o cache do navegador e tentei em aba anônima.",
        timestamp: "2023-10-12T14:30:00Z"
      },
      {
        id: "msg-2",
        sender: "support",
        content: "Olá João, estamos verificando os logs do servidor. Parece ser um problema de autenticação no banco de dados.",
        timestamp: "2023-10-12T15:10:00Z"
      }
    ],
    user: {
      name: "John Doe",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbyQUjN3bvR--ox5xM3p2rEtVjgbahMGRSpKeS4jRz5MA8z7SEJei3lt8hdIABEywHWe8dHrOmuVBRTvtnChlIRgBpPw5N6MC_1dx9eKyNVgiYKdRsnfq-hqLPLBzQ7ms3VpMevORUwj7w2WM8UGIMjZvkJ6Y1McGubdgGb5eS_1YMrj4lS4oVUcmBzeeo5cE9s4x2XhiIPnRi03Oexru505DM4YEmg4WTtv-FWQpnyuO4jMapT1ZZlURf3GW6vz4LzZ43xRw1MQ0"
    }
  },
  {
    id: "TK-4088",
    subject: "Erro de interface na página de checkout",
    category: "technical",
    priority: "medium",
    status: "in-progress",
    description: "O botão de finalizar compra não está clicável no Safari.",
    createdAt: "2023-10-12T10:00:00Z",
    updatedAt: "2023-10-12T11:00:00Z",
    messages: [],
    user: {
      name: "Sarah Smith",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBENejqFXH0JtkAz7h03NA4A4KOo5nihwBrqCOZ56mp0RhwcvLZqcGIbalIO9zJZ9uueDJoG8ffvY0RHKpDxq1abLGSVFbYwnlmTKJ-vD8dQDAOczOJ_aTDlXDZ8dnPH1kPJciXT9puTy1kueBxyxaZZ57nskeNKvacY6LRMF-HyzeESxOb4A9t1nAxkP6Fg6nSSWZQ-KycoZSMwzyql0MjClk5nZlkfZ2KTMFoDYnRfJjPtNsJG5XETZepzOO2l-22gPQpAop7lu0"
    }
  },
  {
    id: "TK-4085",
    subject: "Atualizar documentação para API v2",
    category: "feature",
    priority: "low",
    status: "open",
    description: "Precisamos atualizar os endpoints na documentação.",
    createdAt: "2023-10-11T14:30:00Z",
    updatedAt: "2023-10-11T14:30:00Z",
    messages: [],
    user: {
      name: "Mike Johnson",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxzCV3dbIP-Zs1-9bv-O8TOqhRxjm8Js34-cz5rzOuVJh0nnanIZvzUb5CvkMnxeKM39blTwIWmU8DdAYg4Eos_fs7nV3uR6AvkcDZ9EqcWCtRsGGEOGC9ZPHDqcfxpvLnfuB3w2ICuLNJV92B5Q9uU9W3lBIziYo-XL4g8PT8M2iNaVE4jDGpEez1Kz29QSn7-z5sct1rN32N1oAmFLswZdpPrw37vrE7HXPuYk7fd_3ngWQbwJGOJ7t3amB7gye47XXZFiaJU_s"
    }
  },
  {
    id: "TK-4081",
    subject: "Timeout no gateway de pagamento",
    category: "billing",
    priority: "high",
    status: "closed",
    description: "Transações estão falhando com timeout.",
    createdAt: "2023-10-10T09:00:00Z",
    updatedAt: "2023-10-10T10:30:00Z",
    messages: [],
    user: {
      name: "Anna W.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdx21lnPiL_ooJeErhSdZ-KWfa4yibXXkSzoQwnOM3tX2WOLDck49-oj3CmDHWNXFXbIdelq-mnDk_1rGmpjTDgWvnpw-L9HQmnRHfB-5NxUVyAA8CLUn8LIM5Y4rtDJfJZJItENyJ8j9CMOzvZwqL4U1uilu3arQ8EqazXRRjSpiEoQ5pEEnkHZHkUrYMVnVUK-DughyL9Bif0nc-TSstIRE_SQieX2PdKMZ1097VwSszc-ZzJBbBMWhNCgcm-yW2tP5Opjo_T5I"
    }
  }
];

const mockUser: UserProfile = {
  id: "U-1",
  name: "Alexander Wright",
  email: "alexander.wright@enterprise.com",
  phone: "(11) 98765-4321",
  role: "admin",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPWijcgfQ0a4C2jdByvaZNewzarOXnRlMU_RJu2o5Fs-0YUHoY338zuWh0Pb8HyLPGCWzPNwF2l4zfiERrby93Af1b5mHhfKoKg0oXHXwJ-ixBIqdzQzM37RkVO1lFzqjOP0o7pMF2GTQ3mj2ZiARU4gaFWn8HuJ3B74UONFgY-4XhoEFJo7D_B4MsX0XSedwTnWFG-ek5A8BRzO7FTha4afzR_tuE48PElYFaSIqf-afkyhvAvMYv2EJzU-Hm-07ezuObiWueQcA"
};

const API_URL = import.meta.env.VITE_API_URL || '/api';
// const API_URL = import.meta.env.VITE_API_URL || '/api';
const IS_PRODUCTION = import.meta.env.PROD;
const IS_PROXY = API_URL.startsWith('/') || API_URL.startsWith(window.location.origin);

const isLoggedIn = () => !!localStorage.getItem('access_token');

// Helper to get CSRF token from cookies if needed
function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  if (!cookieValue && (name === 'csrftoken' || name === 'sessionid')) {
    // Hidden for production
  }
  return cookieValue;
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  headers.set('X-Requested-With', 'XMLHttpRequest');

  let token = localStorage.getItem('access_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'omit',
    mode: IS_PROXY ? 'same-origin' : 'cors',
  });

  // Handle Token Refresh on 401
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/token/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem('access_token', data.access);
          
          // Retry original request with new token
          headers.set('Authorization', `Bearer ${data.access}`);
          response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: 'omit',
            mode: IS_PROXY ? 'same-origin' : 'cors',
          });
          return response;
        }
      } catch (e) {
        console.error("[API] Failed to refresh token", e);
      }
    }
  }

  if (!response.ok && response.status !== 401 && response.status !== 403) {
    console.error(`[API] Error for ${endpoint}: ${response.status} ${response.statusText}`);
  }

  if (response.status === 401 || response.status === 403) {
    console.error(`[API] Auth error (${response.status}) for ${endpoint}. Redirecting.`);
    api.logout(); // Use centralized logout
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/html')) {
    console.warn(`[API] Endpoint ${endpoint} returned HTML instead of JSON.`);
  }

  return response;
}

function mapTicket(data: any): Ticket {
  return {
    id: data.id?.toString() || "",
    subject: data.titulo || data.subject || "",
    category: data.categoria?.nome || data.category || "",
    priority: data.prioridade === 'baixa' ? 'low' : data.prioridade === 'media' ? 'medium' : data.prioridade === 'alta' || data.prioridade === 'urgente' ? 'high' : data.priority || 'low',
    status: data.status === 'aberto' ? 'open' : data.status === 'em_andamento' ? 'in-progress' : data.status === 'resolvido' || data.status === 'fechado' ? 'closed' : data.status || 'open',
    description: data.descricao || data.description || "",
    createdAt: data.criado_em || data.createdAt || new Date().toISOString(),
    updatedAt: data.atualizado_em || data.updatedAt || new Date().toISOString(),
    messages: (data.comentarios || data.messages || []).map((msg: any) => ({
      id: msg.id?.toString() || Math.random().toString(),
      sender: msg.criado_por?.is_staff ? 'support' : 'user',
      content: msg.texto || msg.content || "",
      timestamp: msg.criado_em || msg.timestamp || new Date().toISOString()
    })),
    user: {
      name: data.criado_por?.first_name ? `${data.criado_por.first_name} ${data.criado_por.last_name}`.trim() : data.criado_por?.username || data.user?.name || "Usuário",
      avatar: data.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.criado_por?.username || 'User')}&background=random`
    }
  };
}

export const api = {
  async login(username: string, password: string):Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
      const headers: Record<string, string> = { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      };

      const res = await fetch(`${API_URL}/auth/token/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ username, password }),
        credentials: 'omit',
        mode: IS_PROXY ? 'same-origin' : 'cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('is_logged_in', 'true');
        return data;
      } else {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData.detail || errorData.error || `Erro ${res.status}: ${res.statusText}`;
        throw new Error(msg);
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Erro no login", error);
      if (error.name === 'AbortError') {
        throw new Error("O servidor demorou muito para responder. Verifique sua conexão.");
      }
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error("Não foi possível conectar ao servidor. Verifique se o endereço está correto ou se há erro de CORS.");
      }
      throw error;
    }
  },

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_logged_in');
    window.location.href = '/';
  },

  async getDashboardStats(): Promise<DashboardStats | null> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/dashboard/stats/`);
      if (res.ok) {
        return await res.json();
      }
      console.error(`Erro ao buscar estatísticas do dashboard: ${res.status} ${res.statusText}`);
      return null;
    }
    return null;
  },
  async getCompanies(): Promise<any[]> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/meta/companies/`);
      if (res.ok) {
        const data = await res.json();
        const results = Array.isArray(data) ? data : (data.results || []);
        return results;
      }
      console.error(`[API] Erro ao buscar empresas: ${res.status}`);
    }
    return [];
  },
  async getCategories(empresaId?: number): Promise<any[]> {
    if (isLoggedIn()) {
      const url = empresaId ? `/meta/categories/?empresa_id=${empresaId}` : `/meta/categories/`;
      const res = await fetchWithAuth(url);
      if (res.ok) {
        const data = await res.json();
        const results = Array.isArray(data) ? data : (data.results || []);
        return results;
      }
      console.error(`[API] Erro ao buscar categorias: ${res.status}`);
    }
    return [];
  },
  async getEmployees(empresaId?: number): Promise<any[]> {
    if (isLoggedIn()) {
      const url = empresaId ? `/meta/employees/?empresa_id=${empresaId}` : `/meta/employees/`;
      const res = await fetchWithAuth(url);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : (data.results || []);
      }
    }
    return [];
  },
  async getTickets(): Promise<Ticket[]> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/mobile/tickets/`);
      if (res.ok) {
        const data = await res.json();
        const ticketsArray = Array.isArray(data) ? data : (data.results || []);
        return ticketsArray.map(mapTicket);
      }
      console.error(`Erro ao buscar chamados: ${res.status} ${res.statusText}`);
      return [];
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockTickets), 500));
  },
  async getTicket(id: string): Promise<Ticket | undefined> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/mobile/tickets/${id}/`);
      if (res.ok) {
        const data = await res.json();
        return mapTicket(data);
      }
      console.error(`Erro ao buscar chamado ${id}: ${res.status} ${res.statusText}`);
      return undefined;
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockTickets.find(t => t.id === id) || mockTickets[0]), 300));
  },
  async createTicket(ticket: any): Promise<Ticket> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/mobile/tickets/create/`, {
        method: 'POST',
        body: JSON.stringify(ticket)
      });
      if (res.ok) {
        const data = await res.json();
        return mapTicket(data);
      }
      throw new Error(`Erro ao criar chamado: ${res.status} ${res.statusText}`);
    }
    
    const newTicket: Ticket = {
      ...ticket,
      id: `TK-${Math.floor(Math.random() * 10000)}`,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      user: {
        name: mockUser.name,
        avatar: mockUser.avatarUrl
      }
    };
    mockTickets.unshift(newTicket);
    return new Promise((resolve) => setTimeout(() => resolve(newTicket), 500));
  },
  async addTicketComment(id: string, text: string): Promise<any> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/mobile/tickets/${id}/comment/`, {
        method: 'POST',
        body: JSON.stringify({ texto: text })
      });
      if (res.ok) return res.json();
      throw new Error(`Erro ao adicionar comentário: ${res.status} ${res.statusText}`);
    }
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
  },
  async updateTicketStatus(id: string | number, status: string): Promise<any> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/mobile/tickets/${id}/status/`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) return res.json();
      throw new Error(`Erro ao atualizar status: ${res.status} ${res.statusText}`);
    }
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
  },
  async getUserProfile(): Promise<UserProfile> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/auth/user/`);
      if (res.ok) {
        const data = await res.json();
        const user = data.user || data;
        return {
          id: user.id?.toString() || "0",
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || "Usuário",
          email: user.email || "",
          phone: "",
          role: user.is_superuser ? "Admin" : (user.is_staff ? "Staff" : "User"),
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=random`
        };
      }
      console.error(`Erro ao buscar perfil: ${res.status} ${res.statusText}`);
      return { id: "0", name: "Usuário Autenticado", email: "", phone: "", role: "user", avatarUrl: "https://ui-avatars.com/api/?name=User" };
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockUser), 300));
  },
  async updateUserProfile(user: Partial<UserProfile>): Promise<UserProfile> {
    if (isLoggedIn()) {
      const res = await fetchWithAuth(`/auth/user/`, {
        method: 'PUT',
        body: JSON.stringify(user)
      });
      if (res.ok) {
        const data = await res.json();
        const updatedUser = data.user || data;
        return {
          id: updatedUser.id?.toString() || "0",
          name: `${updatedUser.first_name || ''} ${updatedUser.last_name || ''}`.trim() || updatedUser.username || "Usuário",
          email: updatedUser.email || "",
          phone: "",
          role: updatedUser.is_superuser ? "Admin" : (updatedUser.is_staff ? "Staff" : "User"),
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(updatedUser.username || 'User')}&background=random`
        };
      }
      throw new Error(`Erro ao atualizar perfil: ${res.status}`);
    }
    Object.assign(mockUser, user);
    return new Promise((resolve) => setTimeout(() => resolve(mockUser), 500));
  }
};
