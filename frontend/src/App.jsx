import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import "./index.css";
import AllTasks from "./components/AllTasks";
import CreateTask from "./components/CreateTask";
import { Toaster } from "react-hot-toast";
import CompletedTasks from "./components/CompletedTasks";
import IncompleteTasks from "./components/IncompleteTasks";
import HighTasks from "./components/HighTasks";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  // List of routes where the sidebar should not be displayed
  // const noSidebarRoutes = ["/register", "/login"];
  // const shouldShowSidebar = !noSidebarRoutes.includes(window.location.pathname);

  return (
    <BrowserRouter>
      <div className="container">
        {/* Conditionally render the Sidebar */}
        {/* {shouldShowSidebar && <Sidebar />} */}
        <Sidebar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AllTasks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/incomplete" element={<IncompleteTasks />} />
          <Route path="/high" element={<HighTasks />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
