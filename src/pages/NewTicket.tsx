import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function NewTicket() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState<"baixa" | "media" | "alta" | "urgente">("media");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companies, setCompanies] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadMetadata() {
      try {
        const comps = await api.getCompanies();
        setCompanies(comps);
        if (comps.length === 1) {
          setCompanyId(comps[0].id.toString());
        }
      } catch (e) {
        console.error("Failed to load companies", e);
      }
    }
    loadMetadata();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      if (companyId) {
        try {
          const cats = await api.getCategories(Number(companyId));
          setCategories(cats);
        } catch (e) {
          console.error("Failed to load categories", e);
        }
      } else {
        setCategories([]);
      }
    }
    loadCategories();
  }, [companyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createTicket({
        titulo: subject,
        descricao: description,
        empresa_id: Number(companyId),
        categoria_id: Number(categoryId),
        prioridade: priority
      });
      navigate("/tickets");
    } catch (error) {
      console.error("Failed to create ticket", error);
      // Handle error (e.g., show a toast)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen flex flex-col max-w-md mx-auto relative">
      <header className="bg-white border-b border-slate-100 px-4 pt-12 pb-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/tickets" className="px-3 py-1.5 text-slate-500 font-bold text-xs hover:bg-slate-50 rounded-xl transition-colors shrink-0">Cancelar</Link>
          <h1 className="text-sm font-bold text-slate-800 text-center flex-1 px-2 line-clamp-1">Novo Chamado</h1>
          <div className="w-16 shrink-0"></div> {/* Balanced spacer to center title */}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 overscroll-behavior-y-contain">
        <form id="new-ticket-form" onSubmit={handleSubmit} className="space-y-8 pb-24">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Assunto</label>
              <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="O que está acontecendo?" className="w-full h-14 px-5 rounded-2xl border border-slate-100 bg-slate-50 text-base font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" required />
            </div>

            {companies.length > 1 && (
              <div className="space-y-2">
                <label htmlFor="company" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Empresa</label>
                <div className="relative">
                  <select id="company" value={companyId} onChange={e => setCompanyId(e.target.value)} className="w-full h-14 px-5 appearance-none rounded-2xl border border-slate-100 bg-slate-50 text-base font-medium pr-12 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" required>
                    <option value="" disabled>Selecione uma empresa</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="category" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
              <div className="relative">
                <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} disabled={!companyId && companies.length > 0} className="w-full h-14 px-5 appearance-none rounded-2xl border border-slate-100 bg-slate-50 text-base font-medium pr-12 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none disabled:opacity-50" required>
                  <option value="" disabled>Selecione uma categoria</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Prioridade</label>
              <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                {[
                  { id: 'baixa', label: 'Baixa' },
                  { id: 'media', label: 'Média' },
                  { id: 'alta', label: 'Alta' }
                ].map(p => (
                  <div key={p.id} className="flex-1 relative">
                    <input type="radio" name="priority" id={p.id} value={p.id} checked={priority === p.id} onChange={() => setPriority(p.id as any)} className="peer hidden" />
                    <label htmlFor={p.id} className="block text-center py-3 rounded-xl text-xs font-bold transition-all cursor-pointer peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm text-slate-500">
                      {p.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Detalhes do problema..." className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-base font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none outline-none" required></textarea>
            </div>
          </section>
        </form>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 max-w-md mx-auto z-20">
        <button 
          type="submit" 
          form="new-ticket-form" 
          disabled={isSubmitting || !companyId || !categoryId} 
          className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined">send</span>
          )}
          <span>{isSubmitting ? "Criando..." : "Criar Chamado"}</span>
        </button>
      </footer>
    </div>
  );
}
