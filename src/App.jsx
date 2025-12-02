import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AddRecipe from "./pages/AddRecipe";
import M1_carbine from "./pages/M1_Carbine"; 
import Carcano from "./pages/Carcano";
import M1_Garand from "./pages/M1_Garand";
import Krag_Jorgensen from "./pages/Krag_Jorgensen"; 
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Mosin_nagant from "./pages/Mosin_Nagant";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/carcano" element={<Carcano />} />
          <Route path="/Mosin_Nagant" element={<Mosin_nagant />} />
          <Route path="/M1_Garand" element={<M1_Garand />} />
          <Route path="/Krag_Jorgensen" element={<Krag_Jorgensen/>} />
          <Route path="/M1_Carbine" element={<M1_carbine />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
