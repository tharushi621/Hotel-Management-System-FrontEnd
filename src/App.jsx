import "./App.css";
import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Loginpage from "./pages/login.jsx";
import AdminCategories from "./pages/client-pages/categories.jsx";
import TestPage from "./components/test.jsx";
import {Toaster} from 'react-hot-toast';
import AdminCategory from "./pages/admin/category.jsx";

function App() {

  return (
   
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false}/>
    <Routes>
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path = "/login" element={<Loginpage/>}/>
    <Route path = "/categories" element={<AdminCategory/>}/>
    <Route path = "/test" element={<TestPage/>}/>
    <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
