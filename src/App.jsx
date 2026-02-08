import "./App.css";
import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {

  return (
   
    <BrowserRouter>
    <Routes>
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
