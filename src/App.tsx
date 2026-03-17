import { IonApp } from "@ionic/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { TicketList } from "./pages/TicketList";
import { TicketDetails } from "./pages/TicketDetails";
import { NewTicket } from "./pages/NewTicket";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { ChangePassword } from "./pages/ChangePassword";
import { Notifications } from "./pages/Notifications";

import { pushService } from "./services/push";
import { Navigate } from "react-router-dom";

export default function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light }); // 'Light' means white background, dark icons
      StatusBar.setBackgroundColor({ color: '#ffffff' });
      
      // Initialize Push Notifications if authenticated (Optimized async startup)
      if (isAuthenticated) {
        setTimeout(() => {
          pushService.init().catch(err => console.error('[App] Push init failed:', err));
        }, 1000); // 1s delay to let the app settle
      }
    }
  }, [isAuthenticated]);

  return (
    <IonApp>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/new" element={<NewTicket />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/password" element={<ChangePassword />} />
          <Route path="/profile/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </IonApp>
  );
}
