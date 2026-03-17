import { Link, useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import React, { useEffect, useState } from "react";
import { api, DashboardStats, UserProfile, Ticket } from "../services/api";

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/tickets?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    Promise.all([
      api.getDashboardStats().then(setStats).catch(console.error),
      api.getUserProfile().then(setUser).catch(console.error),
      api.getTickets().then(tickets => {
        setRecentTickets(tickets.slice(0, 5));
      }).catch(console.error)
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const openTickets = stats?.tickets_abertos || 0;
  const inProgressTickets = stats?.tickets_urgentes || 0; 
  const closedTickets = stats?.tickets_resolvidos || 0;
  const totalTickets = stats?.total_tickets || (openTickets + inProgressTickets + closedTickets) || 0;

  return (
    <div className="bg-background-light h-screen flex flex-col overflow-hidden max-w-md mx-auto relative transition-colors">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 h-16 flex items-center justify-between max-w-md mx-auto transition-colors">
        <h1 className="text-xl font-bold text-slate-800">SupportDesk</h1>
        <div className="relative">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-16 pb-24 overscroll-behavior-y-contain">
        {user && (
          <section className="px-4 pt-6 pb-2">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img alt={user.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover" src={user.avatarUrl} />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">{user.name}</h2>
                <p className="text-sm text-slate-500 font-medium">{user.role}</p>
              </div>
            </div>
          </section>
        )}

        <section className="px-4 mt-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-symbols-outlined text-slate-400">search</span>
            </span>
            <input 
              type="text" 
              placeholder="Pesquisar chamados..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm shadow-sm text-slate-800 placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </section>

        <section className="px-4 mt-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Ações Rápidas</h2>
          <div className="grid gap-3">
            <Link to="/tickets/new" className="flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-4 rounded-xl font-semibold shadow-md shadow-primary/10 hover:bg-primary-hover active:scale-[0.98] transition-all">
              <span className="material-symbols-outlined text-xl">add_circle</span>
              <span className="text-sm">Novo Chamado</span>
            </Link>
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">{openTickets}</span>
              <span className="text-blue-800 text-[10px] font-bold uppercase tracking-wider">Abertos</span>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-orange-600 text-2xl font-bold">{stats?.total_tickets || 0}</span>
              <span className="text-orange-800 text-[10px] font-bold uppercase tracking-wider">Total</span>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-green-600 text-2xl font-bold">{closedTickets}</span>
              <span className="text-green-800 text-[10px] font-bold uppercase tracking-wider">Fechados</span>
            </div>
          </div>
        </section>

        <section className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Chamados Recentes</h2>
            <Link to="/tickets" className="text-primary text-sm font-medium">Ver Todos</Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : recentTickets.length > 0 ? (
            <div className="space-y-3">
              {recentTickets.map(ticket => (
                <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="block bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-2 hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">#{ticket.id}</span>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${
                      ticket.priority === 'high' || ticket.priority === 'alta' ? 'bg-red-50 text-red-600 border-red-100' :
                      ticket.priority === 'medium' || ticket.priority === 'media' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      'bg-green-50 text-green-600 border-green-100'
                    }`}>
                      {ticket.priority === 'high' || ticket.priority === 'alta' ? 'Alta' : 
                       ticket.priority === 'medium' || ticket.priority === 'media' ? 'Média' : 'Baixa'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 leading-tight line-clamp-2">{ticket.subject}</h3>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                        {ticket.user?.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{ticket.user?.name || 'Usuário'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm">
              <span className="material-symbols-outlined text-slate-300 text-5xl mb-3">inbox</span>
              <p className="text-slate-500 text-sm">Nenhum chamado recente encontrado.</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
