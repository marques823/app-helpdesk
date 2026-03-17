import { Link, useLocation } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { useEffect, useState, useMemo } from "react";
import { api, Ticket } from "../services/api";

export function TicketList() {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("q") || "");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  useEffect(() => {
    api.getTickets()
      .then(setTickets)
      .catch(err => console.error("Erro ao carregar chamados:", err));
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ticket.id.toString().includes(searchTerm);
    
    // Normalize status for comparisons
    const tStatus = ticket.status; // 'open', 'in-progress', 'closed'
    const fStatus = statusFilter;  // 'aberto', 'em_andamento', 'resolvido', 'fechado'

    const matchesStatus = !statusFilter || (
      (fStatus === 'aberto' && tStatus === 'open') ||
      (fStatus === 'em_andamento' && tStatus === 'in-progress') ||
      (fStatus === 'resolvido' && tStatus === 'closed' && ticket.subject.toLowerCase().includes('resolvido')) || 
      (fStatus === 'fechado' && tStatus === 'closed')
    );

    // Normalize priority for comparisons
    const tPriority = ticket.priority; // 'low', 'medium', 'high'
    const fPriority = priorityFilter;  // 'alta', 'media', 'baixa'

    const matchesPriority = !priorityFilter || (
      (fPriority === 'alta' && (tPriority === 'high' || tPriority === 'alta')) ||
      (fPriority === 'media' && (tPriority === 'medium' || tPriority === 'media')) ||
      (fPriority === 'baixa' && (tPriority === 'low' || tPriority === 'baixa'))
    );

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => prev === status ? null : status);
  };

  const togglePriorityFilter = (priority: string) => {
    setPriorityFilter(prev => prev === priority ? null : priority);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light pb-24">
      <header className="flex items-center px-4 py-4 justify-between border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Central de Ajuda</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link to="/profile" className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600" title="Perfil">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      <div className="px-4 py-4">
        <label className="relative flex w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Buscar chamados por ID ou assunto" 
            className="w-full h-12 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-primary pl-12 pr-4 placeholder:text-slate-400 text-slate-800 outline-none" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-4 px-4 pb-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Status</span>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {[
              { id: 'aberto', label: 'Aberto' },
              { id: 'em_andamento', label: 'Andamento' },
              { id: 'resolvido', label: 'Resolvido' },
              { id: 'fechado', label: 'Fechado' }
            ].map(status => (
              <button 
                key={status.id}
                onClick={() => setStatusFilter(statusFilter === status.id ? null : status.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  statusFilter === status.id 
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/30'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Prioridade</span>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {[
              { id: 'alta', label: 'Alta', color: 'bg-red-500' },
              { id: 'media', label: 'Média', color: 'bg-orange-400' },
              { id: 'baixa', label: 'Baixa', color: 'bg-green-500' }
            ].map(priority => (
              <button 
                key={priority.id}
                onClick={() => setPriorityFilter(priorityFilter === priority.id ? null : priority.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  priorityFilter === priority.id 
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/30'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${priority.color}`}></span>
                {priority.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 overflow-y-auto overscroll-behavior-y-contain">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-bold text-slate-400 text-[9px] uppercase tracking-tighter opacity-70">
            {filteredTickets.length} {filteredTickets.length === 1 ? 'Chamado encontrado' : 'Chamados encontrados'}
          </h2>
        </div>
        
        <div className="space-y-4 pb-20">
          {filteredTickets.map(ticket => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className={`block p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.98] ${ticket.status === 'fechado' || ticket.status === 'resolvido' ? 'opacity-80' : ''}`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">#{ticket.id}</span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                  ticket.status === 'aberto' || ticket.status === 'open' ? 'bg-primary/5 text-primary border-primary/10' :
                  ticket.status === 'em_andamento' || ticket.status === 'in-progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  ticket.status === 'resolvido' ? 'bg-green-50 text-green-600 border-green-100' :
                  'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                  {ticket.status === 'aberto' || ticket.status === 'open' ? 'Aberto' : 
                   ticket.status === 'em_andamento' || ticket.status === 'in-progress' ? 'Andamento' : 
                   ticket.status === 'resolvido' ? 'Resolvido' : 'Fechado'}
                </span>
              </div>
              
              <h3 className="font-bold text-slate-800 text-base mb-4 leading-snug line-clamp-2">{ticket.subject}</h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    ticket.priority === 'high' || ticket.priority === 'alta' ? 'bg-red-500' :
                    ticket.priority === 'medium' || ticket.priority === 'media' ? 'bg-orange-400' :
                    'bg-green-500'
                  }`}></div>
                  <span className="text-xs font-bold text-slate-500">
                    {ticket.priority === 'high' || ticket.priority === 'alta' ? 'Alta' : 
                     ticket.priority === 'medium' || ticket.priority === 'media' ? 'Média' : 'Baixa'}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span className="text-[10px] font-bold">{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* FAB - Fixed Action Button for NEW Ticket */}
      <div className="fixed bottom-28 right-6 z-[40]">
        <Link to="/tickets/new" className="flex size-14 rounded-full bg-primary/80 backdrop-blur-sm text-white shadow-md items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl">add</span>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
