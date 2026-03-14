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
      <header className="bg-white border-b border-[#C6C6C8] px-4 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/tickets" className="text-[#007AFF] text-lg font-normal">Cancelar</Link>
          <h1 className="text-lg font-semibold text-black">Novo Chamado</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="flex-grow p-4">
        <form id="new-ticket-form" onSubmit={handleSubmit} className="space-y-6">
          <section className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="subject" className="text-xs font-semibold text-[#8E8E93] uppercase ml-1">Assunto</label>
              <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Título breve do problema" className="w-full h-12 px-4 rounded-xl border-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#007AFF] bg-white text-base transition-all outline-none" required />
            </div>

            {companies.length > 1 && (
              <div className="space-y-1">
                <label htmlFor="company" className="text-xs font-semibold text-[#8E8E93] uppercase ml-1">Empresa</label>
                <div className="relative">
                  <select id="company" value={companyId} onChange={e => setCompanyId(e.target.value)} className="w-full h-12 px-4 appearance-none rounded-xl border-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#007AFF] bg-white text-base pr-10 outline-none" required>
                    <option value="" disabled>Selecione uma empresa</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E8E93]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="category" className="text-xs font-semibold text-[#8E8E93] uppercase ml-1">Categoria</label>
              <div className="relative">
                <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} disabled={!companyId && companies.length > 0} className="w-full h-12 px-4 appearance-none rounded-xl border-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#007AFF] bg-white text-base pr-10 outline-none disabled:opacity-50" required>
                  <option value="" disabled>Selecione uma categoria</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                  {categories.length === 0 && (
                    <option value="other" disabled>Carregando categorias...</option>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E8E93]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#8E8E93] uppercase ml-1">Prioridade</label>
              <div className="flex p-1 bg-gray-200 rounded-xl">
                <div className="flex-1 relative">
                  <input type="radio" name="priority" id="baixa" value="baixa" checked={priority === "baixa"} onChange={() => setPriority("baixa")} className="peer hidden" />
                  <label htmlFor="baixa" className="block text-center py-2 rounded-lg text-sm font-medium transition-all cursor-pointer peer-checked:bg-white peer-checked:shadow-sm">Baixa</label>
                </div>
                <div className="flex-1 relative">
                  <input type="radio" name="priority" id="media" value="media" checked={priority === "media"} onChange={() => setPriority("media")} className="peer hidden" />
                  <label htmlFor="media" className="block text-center py-2 rounded-lg text-sm font-medium transition-all cursor-pointer peer-checked:bg-white peer-checked:shadow-sm">Média</label>
                </div>
                <div className="flex-1 relative">
                  <input type="radio" name="priority" id="alta" value="alta" checked={priority === "alta"} onChange={() => setPriority("alta")} className="peer hidden" />
                  <label htmlFor="alta" className="block text-center py-2 rounded-lg text-sm font-medium transition-all cursor-pointer peer-checked:bg-white peer-checked:shadow-sm">Alta</label>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-xs font-semibold text-[#8E8E93] uppercase ml-1">Descrição</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Conte-nos mais sobre o problema..." className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-black/5 focus:ring-2 focus:ring-[#007AFF] bg-white text-base transition-all resize-none outline-none" required></textarea>
            </div>
          </section>
        </form>
      </main>

      <footer className="p-4 pb-8 bg-[#F2F2F7] border-t border-[#C6C6C8]/50">
        <button type="submit" form="new-ticket-form" disabled={isSubmitting || !companyId || !categoryId} className="w-full bg-[#007AFF] text-white font-semibold py-4 rounded-2xl active:opacity-80 transition-opacity shadow-lg shadow-[#007AFF]/20 disabled:opacity-50">
          {isSubmitting ? "Criando..." : "Criar Chamado"}
        </button>
      </footer>
    </div>
  );
}
