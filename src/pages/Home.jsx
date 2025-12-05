import { useState, useEffect } from "react";
import "../css/Home.css";
import ImageCard from "../components/ImageCard";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState(""); // New state for country filter
  const [firearms, setFirearms] = useState([]);
  const [countries, setCountries] = useState([]); // List of unique countries

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "param",
      `SELECT Firearm_ID, Firearm_Name, Country, Website, picture FROM firearms ORDER BY Firearm_Name`
    );

    fetch("http://localhost/reactapp/getData.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFirearms(data);
        // Extract unique countries for the dropdown
        const uniqueCountries = [
          ...new Set(data.map((f) => f.Country).filter(Boolean)),
        ];
        setCountries(uniqueCountries);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredFirearms = firearms.filter((f) => {
    const matchesName = f.Firearm_Name.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesCountry = countryFilter
      ? f.Country === countryFilter
      : true;
    return matchesName && matchesCountry;
  });

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

        <select
          className="search-input"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All Countries</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="recipes-grid">
        {filteredFirearms.map((f) => {
          const specialPages = {
            "M1 Carbine": "/M1_Carbine",
            "M1 Garand": "/M1_Garand",
            Carcano: "/carcano",
            "Krag Jorgensen": "/Krag_Jorgensen",
            "Mosin Nagant": "/Mosin_Nagant",
          };

          const pagePath = specialPages[f.Firearm_Name] || null;

          return (
            <ImageCard
              key={f.Firearm_ID}
              name={f.Firearm_Name}
              image={f.picture}
              pagePath={pagePath}
              isUnderDevelopment={!pagePath}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
