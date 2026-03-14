import { Link } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { useEffect, useState } from "react";
import { api, Ticket } from "../services/api";

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    api.getTickets()
      .then(setTickets)
      .catch(err => console.error("Erro ao carregar chamados:", err));
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col max-w-md mx-auto bg-background-light shadow-xl overflow-hidden pb-24">
      <header className="flex items-center px-4 py-4 justify-between border-b border-slate-200 sticky top-0 bg-background-light/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
          <h1 className="text-xl font-bold tracking-tight">Central de Ajuda</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link to="/profile" className="p-2 rounded-full hover:bg-slate-200 transition-colors" title="Perfil">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      <div className="px-4 py-4">
        <label className="relative flex w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input type="text" placeholder="Buscar chamados por ID ou assunto" className="w-full h-12 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-primary pl-12 pr-4 placeholder:text-slate-400 text-base outline-none" />
        </label>
      </div>

      <div className="space-y-3 px-4 pb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1 hide-scrollbar overflow-x-auto whitespace-nowrap">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 self-center mr-2">Status</span>
          <button className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium">
            Aberto <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium">
            Em Andamento <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium">
            Fechado <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
        <div className="flex gap-2 pb-1 hide-scrollbar overflow-x-auto whitespace-nowrap border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 self-center mr-2">Prioridade</span>
          <button className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium">
            Alta <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium">
            Média <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium">
            Baixa <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>

      <main className="flex-1 px-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-bold text-slate-500 text-sm uppercase tracking-widest">Chamados Ativos ({tickets.length})</h2>
          <button className="text-primary font-bold text-sm">Ordenar por Recentes</button>
        </div>
        
        <div className="space-y-3">
          {tickets.map(ticket => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className={`block p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 transition-all cursor-pointer group ${ticket.status === 'closed' ? 'opacity-75' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-primary transition-colors">#{ticket.id}</span>
                {ticket.status === 'open' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">Aberto</span>}
                {ticket.status === 'in-progress' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-600 border border-blue-200">Em Andamento</span>}
                {ticket.status === 'closed' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">Fechado</span>}
              </div>
              <h3 className="font-bold text-base mb-3 line-clamp-1">{ticket.subject}</h3>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {ticket.priority === 'high' && <span className="material-symbols-outlined text-red-500 material-symbols-fill text-xl">priority_high</span>}
                  {ticket.priority === 'medium' && <span className="material-symbols-outlined text-orange-400 material-symbols-fill text-xl">drag_handle</span>}
                  {ticket.priority === 'low' && <span className="material-symbols-outlined text-green-500 material-symbols-fill text-xl">low_priority</span>}
                  <span className="text-xs text-slate-500">
                    Prioridade {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-[11px] font-medium">{new Date(ticket.updatedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Link to="/tickets/new" className="fixed bottom-24 right-6 size-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-20">
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>

      <BottomNav />
    </div>
  );
}
