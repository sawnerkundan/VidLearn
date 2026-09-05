import { Outlet, Link, Navigate } from "react-router-dom";
import "./AppLayout.css";

const AppLayout = () => {
    /** on logout click clear local storage  */
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }   

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">VidLearn</div>

        <nav className="sidebar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/videos/assigned">Assigned Videos</Link>
          <Link to="/videos/add">Add Video</Link>
          <Link to="/videos/list">Video List</Link>
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