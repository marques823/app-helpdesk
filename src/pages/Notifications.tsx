import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export function Notifications() {
  const [settings, setSettings] = useState({
    newTickets: true,
    replies: true,
    statusUpdates: true,
    systemAlerts: false,
    push: true,
    email: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light shadow-xl overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <Link 
          to="/profile"
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-700">arrow_back</span>
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2 text-center mr-10">Notificações</h2>
      </header>

      <main className="flex-1 pb-24">
        {/* Section: Tipos de Notificações */}
        <div className="px-4 py-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 px-1">Tipos de Notificações</h3>
          <div className="space-y-3">
            {[
              { id: 'newTickets' as const, title: 'Novos Tickets', desc: 'Avise-me quando um novo ticket for criado' },
              { id: 'replies' as const, title: 'Respostas em Tickets', desc: 'Alertas para novos comentários' },
              { id: 'statusUpdates' as const, title: 'Atualizações de Status', desc: "Mudanças de 'Aberto' para 'Resolvido'" },
              { id: 'systemAlerts' as const, title: 'Avisos do Sistema', desc: 'Manutenções e comunicados gerais' },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl justify-between border border-slate-200 shadow-sm">
                <div className="flex flex-col">
                  <p className="text-base font-bold">{item.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </div>
                <div className="shrink-0">
                  <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${settings[item.id] ? 'bg-primary' : 'bg-slate-300'}`}>
                    <div className={`h-6 w-6 rounded-full bg-white shadow-md transition-transform transform ${settings[item.id] ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    <input 
                      type="checkbox" 
                      className="invisible absolute" 
                      checked={settings[item.id]} 
                      onChange={() => toggleSetting(item.id)} 
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Canais de Entrega */}
        <div className="px-4 py-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 px-1">Métodos de Entrega</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'push' as const, title: 'Notificações Push', desc: 'Receba no seu celular', icon: 'notifications_active' },
              { id: 'email' as const, title: 'E-mail', desc: 'Resumo diário por correio eletrônico', icon: 'mail' },
            ].map((method) => (
              <label key={method.id} className="flex items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-primary mr-3">{method.icon}</span>
                <div className="flex-1">
                  <p className="text-base font-bold">{method.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{method.desc}</p>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded text-primary border-slate-300 focus:ring-primary" 
                  checked={settings[method.id]} 
                  onChange={() => toggleSetting(method.id)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 py-8">
          <button 
            onClick={() => alert("Preferências salvas com sucesso!")}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Salvar Preferências
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
