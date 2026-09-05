import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Register from "./register/Register"
import NotFound from "./not-found/NotFound"
import Home from "./home/Home"
import Dashboard from "./dashboard/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import AppLayout from "./layout/AppLayout"
import VideoList from "./videos/VideoList"
import AddVideo from "./videos/AddVideo"
import AdminVideoList from "./videos/AdminVideoList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/videos/assigned" element={<VideoList />} />
            <Route path="/videos/add" element={<AddVideo />} />
            <Route path="/videos/list" element={<AdminVideoList />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
