import { Outlet, Link, Navigate } from "react-router-dom";
import "./AppLayout.css";

const AppLayout = () => {
    /** on logout click clear local storage  */
    const user = JSON.parse(localStorage.getItem("user"));
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }   

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">VidLearn</div>

        <nav className="sidebar-nav">
          {user?.role === "user" && (
            <Link to="/dashboard">Dashboard</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          )}
          {user?.role === "user" && (
            <Link to="/videos/assigned">Assigned Videos</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/videos/add">Add Video</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/videos/list">Video List</Link>
          )}
           {user?.role === "admin" && (
            <Link to="/assignments">Video Assignment</Link>
          )}
        </nav>

        <button className="logout" type="button" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div></div>

          <div className="profile">
            👤 Kundan
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;