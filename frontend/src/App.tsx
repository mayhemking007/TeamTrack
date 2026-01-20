import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/dashboard"} element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
