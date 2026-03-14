import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { api, UserProfile } from "../services/api";

export function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getUserProfile().then(data => {
      setUser(data);
      setName(data.name);
      setEmail(data.email);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.updateUserProfile({ name, email });
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen flex flex-col max-w-md mx-auto relative pb-24">
      <header className="flex items-center p-4 bg-background-light sticky top-0 z-10 border-b border-slate-200">
        <Link to="/profile" className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 transition-colors">
          <span className="material-symbols-outlined text-slate-900">arrow_back</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold mr-10">Editar Perfil</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center py-8 px-4 gap-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-primary/20" style={{ backgroundImage: `url('${user.avatarUrl}')` }}>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg flex items-center justify-center border-2 border-background-light">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>
          <button className="text-primary font-semibold text-sm hover:underline">Alterar foto</button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600 px-1">Nome Completo</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" className="w-full h-14 px-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 transition-all" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600 px-1">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full h-14 px-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 transition-all" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600 px-1">Telefone</label>
            <input type="tel" defaultValue="(11) 98765-4321" placeholder="(00) 00000-0000" className="w-full h-14 px-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600 px-1">Cargo/Departamento</label>
            <input type="text" defaultValue="Gerente de Projetos" placeholder="Ex: Suporte TI" className="w-full h-14 px-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 transition-all" />
          </div>

          <div className="pt-6">
            <button type="submit" disabled={isSubmitting} className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50">
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
