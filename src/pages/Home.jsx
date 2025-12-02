import { useState, useEffect } from "react";
import "../css/Home.css";
import ImageCard from "../components/ImageCard";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

  };

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "param",
      `SELECT recipes.recipeid, recipes.favorite, recipes.picture, recipes.recipename, categories.categoryname 
       FROM recipes 
       JOIN recipecategory ON recipecategory.recipeid = recipes.recipeid 
       JOIN categories ON categories.categoryid = recipecategory.categoryid 
       ORDER BY recipes.recipename`
    );
    


    fetch("http://localhost/reactapp/getData.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleToggleFavorite = (recipeid, newFav) => {
    const sql = `UPDATE recipes SET favorite = ${newFav} WHERE recipeid = ${recipeid}`;
    const formData = new FormData();
    formData.append("param", sql);

    fetch("http://localhost/reactapp/getData.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.recipeid === recipeid
              ? { ...recipe, favorite: newFav }
              : recipe
          )
        );
      })
      .catch((error) =>
        console.error("Error updating favorite status:", error)
      );
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
    <div
      style={{
        textAlign: "center",
        height: "10vh",
        alignItems: "center",   
        fontSize: "30px",
        color: "#000000ff",
        textDecoration: "underline", 
        fontWeight: "bold",
      }}
    >
      Please click the blue button for the desired Firearm
    </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Firearms"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <ImageCard
            key={recipe.recipeid}
            name={recipe.recipename}
            image={recipe.picture}
            pagePath={
              recipe.recipename === "M1 Carbine"
                ? "/M1_Carbine"
                : recipe.recipename === "M1 Garand"
                ? "/M1_Garand"
                : recipe.recipename === "Carcano"
                ? "/carcano"
                : recipe.recipename === "Krag Jorgensen"
                ? "/Krag_Jorgensen"
                : recipe.recipename === "Mosin Nagant"
                ? "/Mosin_Nagant"
                : `/recipe/${recipe.recipeid}`
                
            }

          />
        ))}
      </div>

      

    </div>
  );
}

export default Home;
