import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export function ChangePassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="bg-background-light text-slate-900 min-h-screen flex flex-col max-w-md mx-auto relative pb-24">
      <header className="sticky top-0 z-10 flex items-center bg-background-light px-4 py-4 border-b border-slate-200">
        <Link to="/profile" className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-slate-900">arrow_back</span>
        </Link>
        <h1 className="ml-4 text-xl font-bold tracking-tight">Alterar Senha</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-6 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Atualize sua senha</h2>
          <p className="text-slate-600 text-sm">Sua nova senha deve ser diferente das senhas usadas anteriormente para garantir sua segurança.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Senha Atual</label>
            <div className="relative flex items-center">
              <input type="password" placeholder="Digite sua senha atual" className="w-full h-14 px-4 pr-12 rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" required />
              <button type="button" className="absolute right-4 text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Nova Senha</label>
            <div className="relative flex items-center">
              <input type="password" placeholder="Crie uma nova senha" className="w-full h-14 px-4 pr-12 rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" required />
              <button type="button" className="absolute right-4 text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Confirmar Nova Senha</label>
            <div className="relative flex items-center">
              <input type="password" placeholder="Repita a nova senha" className="w-full h-14 px-4 pr-12 rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" required />
              <button type="button" className="absolute right-4 text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-xl space-y-2 border border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Requisitos da Senha</p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
              <span>Mínimo de 8 caracteres</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-sm">circle</span>
              <span>Pelo menos uma letra maiúscula</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-sm">circle</span>
              <span>Pelo menos um número ou caractere especial</span>
            </div>
          </div>

          <button type="submit" className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4">
            Atualizar Senha
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
