import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NoticeProvider } from "./NoticeContext";

import Layout from "./components/pages/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PlaceManagement from "./pages/admin/PlaceManagement";
import BusManagement from "./pages/admin/BusManagement";
import Loading from "./components/pages/Loading";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [isLogin, setIsLogin] = useState(() => !!localStorage.getItem("token"));

  console.log("APP STATE:", { isLogin, user });

  // ✅ Load user only when login state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    setIsLogin(!!token);
    setUser(storedUser);
    setAuthLoading(false); // ✅ important
  }, []);

  const handleAuthChange = () => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    setIsLogin(!!token);
    setUser(storedUser);
    console.log("ROUTE CHECK", { isLogin, user });
  };

  if (authLoading) {
    return <Loading />;
  }

  return (
    <NoticeProvider>
      <BrowserRouter>
        <Routes>

          {!isLogin ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage onLoginSuccess={handleAuthChange} />} />
              <Route path="/register" element={<RegistrationPage />} />
            </>
          ) : (

            <Route path="/" element={<Layout onLogout={handleAuthChange} />}>

              <Route index element={
                user?.role === "admin" ? (
                  <AdminDashboard />
                ) : user?.role === "driver" ? (
                  <div>Driver Dashboard</div>
                ) : user?.role === "student" ? (
                  <div>Student Dashboard</div>
                ) : (
                  <Navigate to="/login" />  // ❗ instead of <Loading />
                )
              }
              />

              {user?.role === "admin" && (
                <>
                  <Route path="/places" element={<PlaceManagement />} />
                  <Route path="/buses" element={<BusManagement />} />
                </>
              )}
            </Route>
          )}
          {/* PUBLIC */}

          {/* PROTECTED */}

          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </NoticeProvider>
  );
}

export default App;