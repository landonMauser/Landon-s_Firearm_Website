import "../css/AddRecipe.css";
import { useState, useRef, useEffect } from "react";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("2");
  const [recipePic, setRecipePic] = useState("");
  const [errName, setErrName] = useState("");
  const [errCategory, setErrCategory] = useState("");
  const [errPic, setErrPic] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [addInfo, setAddInfo] = useState("");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const [country, setCountry] = useState("");
  const [errCountry, setErrCountry] = useState("");

  const [websiteSource, setWebsiteSource] = useState("");
  const [errWebsite, setErrWebsite] = useState("");

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "param",
      "SELECT categoryID, categoryName from myrecipes.categories order by categoryName"
    );

    fetch("http://localhost/reactapp/getData.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setCategoryData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function validate(event) {
    event.preventDefault();

    let hasError = false;
    let trimmedName = "";
    let trimmedPic = "";

    if (websiteSource.trim() === "") {
      setErrWebsite("<== required");
      hasError = true;
    } else {
      setErrWebsite("");
    }

    if (country.trim() === "") {
      setErrCountry("<== required");
      hasError = true;
    } else {
      setErrCountry("");
    }

    if (recipeName.trim() === "") {
      setErrName("<== required");
      hasError = true;
    } else {
      setErrName("");
      trimmedName = recipeName.trim().replace(/'/g, "''");
    }

    if (recipeCategory === "0") {
      setErrCategory("<== required");
      hasError = true;
    } else {
      setErrCategory("");
    }

    if (recipePic === "") {
      setErrPic("<== required");
      hasError = true;
    } else {
      setErrPic("");
      trimmedPic = recipePic.trim().replace(/'/g, "''");
    }

    if (hasError) return;

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost/reactapp/uploadFile.php", {
          method: "POST",
          body: formData,
        });

        const data = await res.text();

        if (!res.ok) {
          setErrPic("<== file could not be uploaded");
          return false;
        }

        console.log("Upload successful:", data);
        return true;
      } catch {
        setErrPic("<== file could not be uploaded");
        return false;
      }
    };

    const success = await uploadImage();
    if (!success) return;

    try {
      const newRecipe = {
        recipename: trimmedName,
        picture: trimmedPic,
        country: country,
        category: recipeCategory,
        website: websiteSource,
      };

      await fetch("http://localhost/reactapp/addData.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      setRecipeName("");
      setRecipeCategory("0");
      setRecipePic("");
      setWebsiteSource("");
      setCountry("");
      setFile(null);

      fileInputRef.current.value = "";

      setAddInfo("Success!");
    } catch (err) {
      setAddInfo(String(err) + " Unexpected error");
    }
  }

  function clearResult() {
    setAddInfo("");
    setErrName("");
    setErrCategory("");
    setErrPic("");
    setErrCountry("");
    setErrWebsite("");
  }

  return (
    <>
      <div className="add-recipe">
        <h2>Make Request</h2>
      </div>

      <div>
      <form onSubmit={validate} className="add-recipe-form">

        <div>
          <label className="reg-msg">Firearm Name</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            onClick={clearResult}
          />
          <label className="err-msg">{errName}</label>
        </div>

        <div>
          <label className="reg-msg">Country of Origin</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onClick={clearResult}
          />
          <label className="err-msg">{errCountry}</label>
        </div>

        <div>
          <label className="reg-msg">Website Source</label>
          <input
            type="text"
            value={websiteSource}
            onChange={(e) => setWebsiteSource(e.target.value)}
            onClick={clearResult}
          />
          <label className="err-msg">{errWebsite}</label>
        </div>

        <div>
          <label className="reg-msg">Category</label>
          <select
            value={recipeCategory}
            onChange={(e) => setRecipeCategory(e.target.value)}
            onClick={clearResult}
          >
            <option value="0">Select Category</option>
            {categoryData.map((cat) => (
              <option key={cat.categoryID} value={cat.categoryID}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <label className="err-msg">{errCategory}</label>
        </div>

        <div>
          <label className="reg-msg">Picture</label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => {
              setRecipePic(e.target.files[0]?.name || "");
              setFile(e.target.files[0]);
            }}
            onClick={clearResult}
          />
          <label className="err-msg">{errPic}</label>
        </div>

        <div>
          <center>
            <button className="sub-button" type="submit">Submit</button>
          </center>
        </div>

      </form>

      </div>
    </>
  );
}

export default AddRecipe;
