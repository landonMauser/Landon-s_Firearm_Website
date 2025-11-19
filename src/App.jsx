import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AddRecipe from "./pages/AddRecipe";
import M1_carbine from "./pages/M1_Carbine"; 
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/M1_Carbine" element={<M1_carbine />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
