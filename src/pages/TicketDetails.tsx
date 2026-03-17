import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { api, Ticket } from "../services/api";

export function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState<string>("user");
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (id) {
      api.getTicket(id).then(setTicket);
      api.getUserProfile().then(profile => setUserRole(profile.role));
    }
  }, [id]);

  const handleUpdateStatus = async (status: string) => {
    if (!id || !ticket) return;
    
    // Cache current status for rollback
    const previousStatus = ticket.status;
    
    // Map frontend status to backend keys
    const statusMap: Record<string, string> = {
      'aberto': 'aberto',
      'in-progress': 'em_andamento',
      'resolved': 'resolvido',
      'closed': 'fechado'
    };
    
    const backendStatus = statusMap[status] || status;

    // Optimistic update
    setTicket({ ...ticket, status: backendStatus });
    setShowStatusPicker(false);

    try {
      await api.updateTicketStatus(id, backendStatus);
      // Optional: Silent refresh to ensure sync with server metadata
      const updatedTicket = await api.getTicket(id);
      if (updatedTicket) setTicket(updatedTicket);
    } catch (error) {
      console.error("Failed to update status", error);
      // Rollback on failure
      setTicket({ ...ticket, status: previousStatus });
      alert("Falha ao atualizar status. Tente novamente.");
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim() || !id || !ticket) return;
    
    const messageContent = comment.trim();
    setComment("");
    
    // Optimistic update for message list
    const newMessage = {
      content: messageContent,
      sender: userRole.toLowerCase() === 'user' ? 'user' : 'support',
      timestamp: new Date().toISOString()
    };
    
    const previousMessages = ticket.messages || [];
    setTicket({
      ...ticket,
      messages: [...previousMessages, newMessage]
    });

    // Scroll to bottom immediately
    setTimeout(() => {
      const main = document.querySelector('main');
      if (main) main.scrollTop = main.scrollHeight;
    }, 50);

    try {
      await api.addTicketComment(id, messageContent);
      // Optional: Silent refresh
      const updatedTicket = await api.getTicket(id);
      if (updatedTicket) setTicket(updatedTicket);
    } catch (error) {
      console.error("Failed to add comment", error);
      // Rollback messages on failure
      setTicket({ ...ticket, messages: previousMessages });
      alert("Falha ao enviar mensagem. Tente novamente.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  if (!ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="font-display bg-background-light text-slate-900 min-h-screen flex flex-col pb-24 max-w-md mx-auto relative">
      <header className="sticky top-0 z-10 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link to="/tickets" className="p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-900">arrow_back</span>
            </Link>
            <h1 className="text-lg font-bold">Detalhes do Chamado</h1>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-slate-900">more_vert</span>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/10 z-20 py-1">
                <Link to="/tickets" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50">
                  <span className="material-symbols-outlined text-slate-400 text-lg">list</span>
                  Voltar para Lista
                </Link>
                <button onClick={() => window.location.reload()} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 text-left">
                  <span className="material-symbols-outlined text-slate-400 text-lg">refresh</span>
                  Atualizar Dados
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary">#{ticket.id}</h2>
            <p className="text-sm text-slate-500">Criado em {new Date(ticket.createdAt).toLocaleDateString('pt-BR')} às {new Date(ticket.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            ticket.status === 'open' || ticket.status === 'aberto' ? 'bg-primary/10 text-primary border-primary/20' :
            ticket.status === 'in-progress' || ticket.status === 'em_andamento' ? 'bg-blue-100 text-blue-600 border-blue-200' :
            'bg-slate-100 text-slate-500 border-slate-200'
          }`}>
            {ticket.status === 'open' || ticket.status === 'aberto' ? 'Em Aberto' : 
             ticket.status === 'in-progress' || ticket.status === 'em_andamento' ? 'Em Andamento' : 
             ticket.status === 'resolvido' ? 'Resolvido' : 'Fechado'}
          </div>
        </div>

        <section className="mx-4 p-4 bg-white rounded-xl shadow-sm border border-primary/5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Assunto</p>
              <p className="font-medium">{ticket.subject}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Categoria</p>
              <p className="font-medium">{ticket.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Prioridade</p>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  ticket.priority === 'high' || ticket.priority === 'urgente' || ticket.priority === 'alta' ? 'bg-red-500' :
                  ticket.priority === 'medium' || ticket.priority === 'media' ? 'bg-orange-400' :
                  'bg-green-500'
                }`}></span>
                <p className="font-medium capitalize">
                  {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Média' : ticket.priority === 'low' ? 'Baixa' : ticket.priority}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Última Atualização</p>
              <p className="font-medium text-slate-600">{new Date(ticket.updatedAt).toLocaleDateString('pt-BR')} {new Date(ticket.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="col-span-full space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Descrição</p>
              <p className="text-sm leading-relaxed text-slate-700">
                {ticket.description}
              </p>
            </div>
          </div>

          {(userRole === 'Staff' || userRole === 'Admin' || userRole === 'suporte' || userRole === 'admin') && (
            <div className="pt-4 border-t border-primary/10">
              <button 
                onClick={() => setShowStatusPicker(true)}
                className="w-full bg-primary/10 text-primary border border-primary/20 py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">sync</span>
                Alterar Status
              </button>
            </div>
          )}
        </section>

        <section className="mt-6 mb-12">
          <div className="flex border-b border-primary/10 px-4 gap-6">
            <button className="pb-3 border-b-2 border-primary text-primary font-bold text-sm">Conversa</button>
            <button className="pb-3 text-slate-400 font-medium text-sm">Notas Internas</button>
          </div>

          <div className="p-4 space-y-6 pb-20">
            {ticket.messages && ticket.messages.map((msg, index) => {
              const isSupport = msg.sender === 'support' || msg.sender === 'staff' || msg.isStaff;
              return (
                <div key={index} className={`flex gap-3 max-w-[90%] ${isSupport ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${isSupport ? 'bg-primary/20' : 'bg-slate-300'}`}>
                    <span className="material-symbols-outlined text-sm text-slate-600">
                      {isSupport ? 'support_agent' : 'person'}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl shadow-sm ${
                    isSupport
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white rounded-tl-none border border-primary/5'
                  }`}>
                    <p className={`text-xs font-bold mb-1 ${isSupport ? 'text-white/80' : ''}`}>
                      {isSupport ? 'Suporte Técnico' : 'Você'} 
                      <span className={`font-normal ml-2 ${isSupport ? 'text-white/60' : 'text-slate-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </p>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Action Sheet for Status Picker */}
      {showStatusPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Alterar Status</h3>
              <button 
                onClick={() => setShowStatusPicker(false)}
                className="p-2 hover:bg-slate-100 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'Em Aberto', value: 'aberto', icon: 'radio_button_unchecked', color: 'text-primary' },
                { label: 'Em Andamento', value: 'in-progress', icon: 'play_circle', color: 'text-blue-500' },
                { label: 'Resolvido', value: 'resolved', icon: 'check_circle', color: 'text-green-500' },
                { label: 'Fechado', value: 'closed', icon: 'cancel', color: 'text-slate-400' }
              ].map((opt) => (
                <button 
                  key={opt.value}
                  onClick={() => handleUpdateStatus(opt.value)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined ${opt.color}`}>{opt.icon}</span>
                    <span className="font-bold text-slate-700">{opt.label}</span>
                  </div>
                  {(ticket.status === opt.value || 
                    (opt.value === 'in-progress' && ticket.status === 'em_andamento') ||
                    (opt.value === 'closed' && ticket.status === 'fechado')) && (
                    <span className="material-symbols-outlined text-primary">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-[72px] left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-primary/10 max-w-md mx-auto z-10">
        <div className="flex items-center gap-2 bg-background-light border border-primary/20 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Escreva uma mensagem..." 
            className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder-slate-400 outline-none" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSubmitting}
          />
          <button 
            className={`text-primary p-1 ${isSubmitting || !comment.trim() ? 'opacity-50' : ''}`}
            onClick={handleAddComment}
            disabled={isSubmitting || !comment.trim()}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
