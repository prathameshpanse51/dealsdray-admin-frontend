import "./App.css";
import { useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";

function MainContent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Render AdminNavbar only if the current path is not "/" */}
      {location.pathname !== "/" && <AdminNavbar />}
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/:id/edit" element={<EmployeeEdit />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <MainContent />
    </BrowserRouter>
  );
}
