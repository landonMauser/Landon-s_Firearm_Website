import "../css/AddRecipe.css";
import { useState, useRef, useEffect } from "react";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("0");
  const [numServings, setNumServings] = useState("0");
  const [recipePic, setRecipePic] = useState("");
  const [errName, setErrName] = useState("");
  const [errCategory, setErrCategory] = useState("");
  const [errServings, setErrServings] = useState("");
  const [errPic, setErrPic] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [addInfo, setAddInfo] = useState("");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const servings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
    let trimmedName = "";
    let trimmedPic = "";

    let hasError = false;

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

    if (numServings === "0") {
      setErrServings("<== required");
      hasError = true;
    } else {
      setErrServings("");
    }

    if (recipePic === "") {
      setErrPic("<== required");
      hasError = true;
    } else {
      setErrPic("");
      trimmedPic = recipePic.trim().replace(/'/g, "''");
    }

    if (hasError) return;

    // upload the image
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
          setErrPic(res.ok);
          return false;
        }

        console.log("Upload successful:", data);
        return true;
      } catch (err) {
        setErrPic("<== file could not be uploaded");
        return false;
      }
    };

    const success = await uploadImage();
    if (!success) return;

    try {
      const newRecipe = {
        recipename: recipeName,
        picture: recipePic,
        category: recipeCategory,
        servings: numServings,
      };

      fetch("http://localhost/reactapp/addData.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      setRecipeName("");
      setRecipeCategory("0");
      setNumServings("0");
      setRecipePic("");
      setFile(null);
      fileInputRef.current.value = "";
      setAddInfo("Success!");
    } catch (err) {
      setAddInfo(err + " Unexpected error");
    }
  }

  function checkRecName(event) {
    setRecipeName(event.target.value);
  }

  function checkCategory(event) {
    setRecipeCategory(event.target.value);
  }

  function checkServings(event) {
    setNumServings(event.target.value);
  }

  function checkPic(event) {
    setRecipePic(event.target.files[0].name);
    setFile(event.target.files[0]);
  }

  function clearResult() {
    setAddInfo("");
    setErrName("");
    setErrCategory("");
    setErrServings("");
    setErrPic("");
  }

  return (
    <>
      <div className="add-recipe">
        <h2>Make Request</h2>
      </div>
      <div>
        <form onSubmit={validate}>
          <div>
            <label className="reg-msg">Firearm Name</label>
            <input
              onChange={checkRecName}
              onClick={clearResult}
              value={recipeName}
              type="text"
              id="recname"
            />
            <label className="err-msg">{errName}</label>
          </div>
          <div>
            <label className="reg-msg">Country of Origin</label>
            <select
              value={recipeCategory}
              onChange={checkCategory}
              onClick={clearResult}
            >
              <option value="0">-</option> {/* Default option */}
              {categoryData.map((item) => (
                <option key={item.categoryID} value={item.categoryID}>
                  {item.categoryName}
                </option>
              ))}
            </select>
            <label className="err-msg">{errCategory}</label>
          </div>
          <div>
            <label className="reg-msg">Website Source</label>
            <select
              value={numServings}
              onChange={checkServings}
              onClick={clearResult}
            >
              <option value="0">-</option> {/* Default option */}
              {servings.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label className="err-msg">{errServings}</label>
          </div>
          <div>
            <label className="reg-msg">Recipe Picture</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={checkPic}
              onClick={clearResult}
              id="recpic"
            />
            <label className="err-msg">{errPic}</label>
          </div>
          <div>
            <center>
              <button className="sub-button" type="submit">
                Submit
              </button>
            </center>
          </div>
          <div>
            <center>
              <label className="add-info-msg">{addInfo}</label>
            </center>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddRecipe;
