import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await api.login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Falha ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col justify-center items-center p-6">
      <main className="w-full max-w-sm bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
        <section className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-primary/10">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">SupportFlow</h1>
          <p className="text-slate-500 text-sm mt-1">Portal de Suporte e Chamados</p>
        </section>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">Usuário</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
              </div>
              <input 
                type="text" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="Seu usuário ou e-mail" 
                className="block w-full pl-12 pr-4 py-4 border border-slate-100 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="••••••••" 
                className="block w-full pl-12 pr-4 py-4 border border-slate-100 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 flex justify-center items-center px-4 border border-transparent rounded-2xl shadow-xl shadow-primary/20 text-base font-bold text-white bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Entrando...</span>
              </div>
            ) : 'Entrar'}
          </button>
        </form>
      </main>

      <footer className="mt-8 text-slate-400 text-xs text-center">
        <p>© 2026 SupportFlow Inc. Todos os direitos reservados.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-slate-600">Política de Privacidade</a>
          <a href="#" className="hover:text-slate-600">Termos de Serviço</a>
        </div>
      </footer>
    </div>
  );
}
