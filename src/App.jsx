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
import Coke_Bottle from "./pages/Coke_Bottle";
import Object1 from "./pages/Object1";
import Object2 from "./pages/Object2";
import Object3 from "./pages/Object3";
import Object4 from "./pages/Object4";
import Object5 from "./pages/Object5";
import Object6 from "./pages/Object6";
import Object7 from "./pages/Object7";
import Object8 from "./pages/Object8";
import Object9 from "./pages/Object9";
import Object10 from "./pages/Object10";
import Object11 from "./pages/Object11";
import Object12 from "./pages/Object12";
import Object13 from "./pages/Object13";
import Object14 from "./pages/Object14";
import Object15 from "./pages/Object15";
import Object16 from "./pages/Object16";
import Object17 from "./pages/Object17";
import Object18 from "./pages/Object18";
import Object19 from "./pages/Object19";
import Object20 from "./pages/Object20";
import Object21 from "./pages/Object21";

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
          <Route path="/Coke_Bottle" element={<Coke_Bottle />} />
          <Route path="/Object1" element={<Object1 />} />
          <Route path="/Object2" element={<Object2 />} />
          <Route path="/Object3" element={<Object3 />} />
          <Route path="/Object4" element={<Object4 />} />
          <Route path="/Object5" element={<Object5 />} />
          <Route path="/Object6" element={<Object6 />} />
          <Route path="/Object7" element={<Object7 />} />
          <Route path="/Object8" element={<Object8 />} />
          <Route path="/Object9" element={<Object9 />} />
          <Route path="/Object10" element={<Object10 />} />
          <Route path="/Object11" element={<Object11 />} />
          <Route path="/Object12" element={<Object12 />} />
          <Route path="/Object13" element={<Object13 />} />
          <Route path="/Object14" element={<Object14 />} />
          <Route path="/Object15" element={<Object15 />} />
          <Route path="/Object16" element={<Object16 />} />
          <Route path="/Object17" element={<Object17 />} />
          <Route path="/Object18" element={<Object18 />} />
          <Route path="/Object19" element={<Object19 />} />
          <Route path="/Object20" element={<Object20 />} />
          <Route path="/Object21" element={<Object21 />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
