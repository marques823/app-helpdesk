import { Link } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { useEffect, useState } from "react";
import { api, UserProfile } from "../services/api";

export function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    api.getUserProfile().then(setUser);
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen flex flex-col max-w-md mx-auto relative pb-24">
      <div className="flex items-center bg-white p-4 border-b border-slate-200 sticky top-0 z-10">
        <Link to="/dashboard" className="flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h2 className="text-lg font-bold flex-1 text-center">Perfil</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-full size-10 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <div className="flex p-8 bg-white border-b border-slate-200">
        <div className="flex w-full flex-col gap-6 items-center">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-primary/20" style={{ backgroundImage: `url("${user.avatarUrl}")` }}>
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-white">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold tracking-tight">{user.name}</p>
            <p className="text-slate-500 font-medium">{user.email}</p>
            <div className="mt-3 px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
              {user.role === 'admin' ? 'Administrador' : user.role === 'agent' ? 'Agente' : 'Usuário'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full p-4 space-y-6">
        <section>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest px-2 mb-3">Configurações da Conta</h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <Link to="/profile/edit" className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Editar Perfil</p>
                <p className="text-xs text-slate-500">Atualize seus dados pessoais</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </Link>
            <Link to="/profile/password" className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Alterar Senha</p>
                <p className="text-xs text-slate-500">Alterada há 3 meses</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </Link>
            <Link to="/profile/notifications" className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Configurações de Notificação</p>
                <p className="text-xs text-slate-500">Gerenciar alertas e mensagens</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </Link>
          </div>
        </section>

        <section>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest px-2 mb-3">Suporte</h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
              <div className="flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0 size-10">
                <span className="material-symbols-outlined">help</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Central de Ajuda</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0 size-10">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Política de Privacidade</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          </div>
        </section>

        <button 
          onClick={() => api.logout()} 
          className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-100 text-red-500 py-4 rounded-xl font-bold hover:bg-red-50 transition-colors border border-slate-200"
        >
          <span className="material-symbols-outlined">logout</span>
          Sair
        </button>
        <p className="text-center text-slate-400 text-xs py-8">Versão do App 2.4.0 (Build 892)</p>
      </div>

      <BottomNav />
    </div>
  );
}
