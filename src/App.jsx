import "./App.css";
import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Loginpage from "./pages/login.jsx";
import AdminCategories from "./pages/client-pages/categories.jsx";

function App() {

  return (
   
    <BrowserRouter>
    <Routes>
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path = "/login" element={<Loginpage/>}/>
    <Route path = "/categories" element={<AdminCategories/>}/>
    <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
