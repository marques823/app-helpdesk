import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-slate-200 bg-white/90 backdrop-blur-md px-4 pb-6 pt-2 z-10">
      <div className="flex justify-around items-center">
        <Link
          to="/dashboard"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            path === "/dashboard" ? "text-primary" : "text-slate-400 hover:text-primary"
          )}
        >
          <span className={cn("material-symbols-outlined", path === "/dashboard" && "material-symbols-fill")}>
            dashboard
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest">Painel</p>
        </Link>
        <Link
          to="/tickets"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            path.startsWith("/tickets") ? "text-primary" : "text-slate-400 hover:text-primary"
          )}
        >
          <span className={cn("material-symbols-outlined", path.startsWith("/tickets") && "material-symbols-fill")}>
            confirmation_number
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest">Chamados</p>
        </Link>
        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            path.startsWith("/profile") ? "text-primary" : "text-slate-400 hover:text-primary"
          )}
        >
          <span className={cn("material-symbols-outlined", path.startsWith("/profile") && "material-symbols-fill")}>
            person
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest">Perfil</p>
        </Link>
      </div>
    </nav>
  );
}
