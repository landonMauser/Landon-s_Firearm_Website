import "../css/AddRecipe.css";
import { useState } from "react";

function AddRecipe() {
  const [firearmName, setFirearmName] = useState("");
  const [country, setCountry] = useState("");
  const [websiteSource, setWebsiteSource] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [errName, setErrName] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errWebsite, setErrWebsite] = useState("");
  const [errImage, setErrImage] = useState("");

  const [addInfo, setAddInfo] = useState("");

  function clearResult() {
    setAddInfo("");
    setErrName("");
    setErrCountry("");
    setErrWebsite("");
    setErrImage("");
  }

  async function validate(event) {
    event.preventDefault();
    let hasError = false;

    if (firearmName.trim() === "") { setErrName("<== required"); hasError = true; } else setErrName("");
    if (country.trim() === "") { setErrCountry("<== required"); hasError = true; } else setErrCountry("");
    if (websiteSource.trim() === "") { setErrWebsite("<== required"); hasError = true; } else setErrWebsite("");
    if (!imageFile) { setErrImage("<== required"); hasError = true; } else setErrImage("");

    if (hasError) return;

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch("http://localhost/reactapp/uploadFile.php", {
        method: "POST",
        body: formData,
      });

      const uploadText = await uploadRes.text();
      console.log("Upload response:", uploadText);

      if (!uploadRes.ok) {
        setAddInfo("Image upload failed: " + uploadText);
        return;
      }

      const savedFileName = uploadText.trim();

      const firearmData = {
        Firearm_Name: firearmName.trim(),
        Country: country.trim(),
        Website: websiteSource.trim(),
        picture: savedFileName
      };

      const res = await fetch("http://localhost/reactapp/addData.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(firearmData),
      });

      const data = await res.text();
      console.log("Add data response:", data);
      setAddInfo(data);

      setFirearmName("");
      setCountry("");
      setWebsiteSource("");
      setImageFile(null);
      document.getElementById("imageInput").value = "";

    } catch (err) {
      setAddInfo("Error: " + err);
    }
  }

  return (
    <div className="add-recipe">
      <h2>Submit Firearm</h2>
      <form onSubmit={validate} className="add-recipe-form">

        <div>
          <label className="reg-msg">Firearm Name</label>
          <input type="text" value={firearmName} onChange={(e) => setFirearmName(e.target.value)} onClick={clearResult} />
          <label className="err-msg">{errName}</label>
        </div>

        <div>
          <label className="reg-msg">Country of Origin</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} onClick={clearResult} />
          <label className="err-msg">{errCountry}</label>
        </div>

        <div>
          <label className="reg-msg">Website Source</label>
          <input type="text" value={websiteSource} onChange={(e) => setWebsiteSource(e.target.value)} onClick={clearResult} />
          <label className="err-msg">{errWebsite}</label>
        </div>

        <div>
          <label className="reg-msg">Upload Image</label>
          <input type="file" id="imageInput" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} onClick={clearResult} />
          <label className="err-msg">{errImage}</label>
        </div>

        <center>
          <button className="sub-button" type="submit">Submit</button>
        </center>

        <div style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
          {addInfo}
        </div>

      </form>
    </div>
  );
}

export default AddRecipe;
