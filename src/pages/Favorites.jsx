import { useState } from "react"; 
import "../css/Favorites.css";
import Credits from "../components/Credits";

const serialRanges = [
  { from: 1, to: 5, manufacturer: "Inland Division, General Motors", date: "November 1941" },
  { from: 6, to: 10, manufacturer: "Winchester Repeating Arms", date: "December 1941" },
  { from: 11, to: 999999, manufacturer: "Inland Division, General Motors", date: "05/42-09/43" },
  { from: 1000000, to: 1349999, manufacturer: "Winchester Repeating Arms", date: "09/42-02/44" },
  // add all rows here
];

const creditData = [
  { name: "M1 Carbine source 1", url: "https://www.militaria-deal.com/militaria-blog/ww2-m1-carbine-guide" },
  { name: "M1 Carbine source 2", url: "http://www.uscarbinecal30.com/serialnumbers.html" },
  { name: "M1 Carbine source 3", url: "https://ia801400.us.archive.org/28/items/the-m1-carbine-leroy-thompson/vdoc.pub_the-m1-carbine-weapon-.pdf" },
];

function Favorites() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim whitespace
    const input = serialNumber.trim();

    // no naughty input
    if (!/^\d{1,10}$/.test(input.replace(/,/g, ""))) {
      setResult(null);
      setSubmitted(true);
      return;
    }

    const info = findSerialInfo(input);
    setResult(info);
    setSubmitted(true);
  };

  const findSerialInfo = (serialNumber) => {
    const cleanNumber = serialNumber.replace(/,/g, "");
    const num = Number(cleanNumber);
    if (isNaN(num)) return null;
    return serialRanges.find(row => num >= row.from && num <= row.to) || null;
  };

  return (
    <div className="favorites">
      <h2>M1 Carbine Serial Number Lookup</h2>
      <form className="serial-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="serial-input"
          placeholder="Enter Serial Number"
          value={serialNumber}
          onChange={(e) => {
            // no naughty input
            const sanitized = e.target.value.replace(/[^\d,]/g, "");
            setSerialNumber(sanitized);
          }}
        />
        <button type="submit" className="serial-button">Submit</button>
      </form>

      {submitted && (
        result ? (
          <div className="serial-result">
            <p><strong>Manufacturer:</strong> {result.manufacturer}</p>
            <p><strong>Date:</strong> {result.date}</p>
            <p><strong>Range:</strong> {result.from.toLocaleString()} - {result.to.toLocaleString()}</p>
          </div>
        ) : (
          <p>No matching serial number found.</p>
        )
      )}

      <Credits creditList={creditData} />
    </div>
  );
}

export default Favorites;
