import "./App.css";
import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Test from "./components/test.jsx";

function App() {

  return (
   
    <BrowserRouter>
    <Routes>
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path="/test" element={<Test/>}/>
    <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
