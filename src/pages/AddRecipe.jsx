import "../css/AddRecipe.css";
import { useState, useRef } from "react";

function AddRecipe() {
  const [firearmName, setFirearmName] = useState("");
  const [country, setCountry] = useState("");
  const [websiteSource, setWebsiteSource] = useState("");

  const [errName, setErrName] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errWebsite, setErrWebsite] = useState("");

  const [addInfo, setAddInfo] = useState("");

  function clearResult() {
    setAddInfo("");
    setErrName("");
    setErrCountry("");
    setErrWebsite("");
  }

  async function validate(event) {
    event.preventDefault();

    let hasError = false;

    if (firearmName.trim() === "") {
      setErrName("<== required");
      hasError = true;
    } else {
      setErrName("");
    }

    if (country.trim() === "") {
      setErrCountry("<== required");
      hasError = true;
    } else {
      setErrCountry("");
    }

    if (websiteSource.trim() === "") {
      setErrWebsite("<== required");
      hasError = true;
    } else {
      setErrWebsite("");
    }

    if (hasError) return;

    // Build object for PHP
    const newFirearm = {
      Firearm_Name: firearmName.trim(),
      Country: country.trim(),
      Website: websiteSource.trim(),
    };

    try {
      const res = await fetch("http://localhost/reactapp/addData.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFirearm),
      });

      const data = await res.text();
      console.log(data);

      setFirearmName("");
      setCountry("");
      setWebsiteSource("");

      setAddInfo("Success!");
    } catch (err) {
      setAddInfo("Error: " + err);
    }
  }

  return (
    <>
      <div className="add-recipe">
        <h2>Submit Firearm</h2>
      </div>

      <form onSubmit={validate} className="add-recipe-form">

        <div>
          <label className="reg-msg">Firearm Name</label>
          <input
            type="text"
            value={firearmName}
            onChange={(e) => setFirearmName(e.target.value)}
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

        <center>
          <button className="sub-button" type="submit">
            Submit
          </button>
        </center>

        <div style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
          {addInfo}
        </div>

      </form>
    </>
  );
}

export default AddRecipe;
