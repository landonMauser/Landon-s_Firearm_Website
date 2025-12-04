import { useRef, useState } from "react";
import "../css/M1_Garand.css";
import Credits from "../components/Credits";

const serialRanges = [
  // Springfield Armory
  { from: 1, to: 100000, manufacturer: "Springfield Armory", date: "1932-1934" },
  { from: 1200000, to: 1655010, manufacturer: "Springfield Armory", date: "1937-1938" },
  { from: 1357474, to: 2305849, manufacturer: "Springfield Armory", date: "1943" },
  { from: 2656149, to: 4399999, manufacturer: "Springfield Armory", date: "Post WWII 1952-1954" },
  { from: 5000000, to: 5000500, manufacturer: "Springfield Armory", date: "August 1952" },
  { from: 5278246, to: 5488246, manufacturer: "Springfield Armory", date: "1954-1955" },
  { from: 5793848, to: 6099905, manufacturer: "Springfield Armory", date: "1955-1957" },

    // Springfield Armory
  { from: 165501, to: 865500, manufacturer: "Springfield Armory", date: "September 1942" },
  { from: 865501, to: 1199999, manufacturer: "Springfield Armory", date: "February 1943" },
  { from: 1357474, to: 2305849, manufacturer: "Springfield Armory", date: "December 1943" },


  // Winchester Repeating Arms Company
  { from: 100001, to: 165500, manufacturer: "Winchester Repeating Arms Company", date: "1941" },
  { from: 1200001, to: 1357473, manufacturer: "Winchester Repeating Arms Company", date: "1942-1943" },
  { from: 1357474, to: 1380000, manufacturer: "Winchester Repeating Arms Company", date: "Duplicate numbers" },

  // Rock Island Arsenal, they are modified versions of rifles made during WW2
  { from: "X2655982", to: "X2656148", manufacturer: "Rock Island Arsenal", date: "N/A" },

  // International Harvester
  { from: 4400000, to: 4660000, manufacturer: "International Harvester", date: "1953–1955" },
  { from: 5000501, to: 5278245, manufacturer: "International Harvester", date: "1955–1956" },

  // Harrington and Richardson
  { from: 4660001, to: 4774959 , manufacturer: "Harrington and Richardson", date: "1953" },
  { from: 4774960, to: 5621393 , manufacturer: "Harrington and Richardson", date: "1954" },
  { from: 5621393, to: 5793847, manufacturer: "Harrington and Richardson", date: "1955-1956" },
];

const creditData = [
  { name: "M1 Garand source 1", url: "https://www.nps.gov/spar/learn/historyculture/u-s-m1-garand-rifle-production.htm" },
  { name: "M1 Garand source 2", url: "https://www.militaria-deal.com/militaria-blog/ww2-garand-m1-rifle-guide" },
  { name: "M1 Garand source 3", url: "https://oldguns.net/sn_php/mildateslookup.php"},
  { name: "M1 Garand source 3", url: "https://myplace.frontier.com/~aleccorapinski/id11.html"},
];

function M1_Garand() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const outputRef = useRef(null);
  const [selectedFirearm, setSelectedFirearm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = serialNumber.trim();

    const isValid =
      /^\d{1,10}$/.test(input.replace(/,/g, "")) || 
      /^X\d{1,10}$/i.test(input);

    if (!isValid) {
      setResult(null);
      setSubmitted(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
      if (outputRef.current) outputRef.current.focus();
      return;
    }

    const info = findSerialInfo(input, selectedFirearm);
    setResult(info);
    setSubmitted(true);

    setPulse(true);
    setTimeout(() => setPulse(false), 500);
    if (outputRef.current) outputRef.current.focus();
  };

  const findSerialInfo = (serialNumber, company) => {
    const clean = serialNumber.trim();

    if (/^X\d+$/i.test(clean)) {
      const upper = clean.toUpperCase();
      const range = serialRanges.find(
        row =>
          typeof row.from === "string" &&
          typeof row.to === "string" &&
          upper >= row.from.toUpperCase() &&
          upper <= row.to.toUpperCase() &&
          (!company || row.manufacturer === company)
      );
      if (range) return range;
      return null;
    }

    const num = Number(clean.replace(/,/g, ""));
    if (isNaN(num)) return null;

    const range = serialRanges.find(
      row =>
        typeof row.from === "number" &&
        typeof row.to === "number" &&
        num >= row.from &&
        num <= row.to &&
        (!company || row.manufacturer === company)
    );

    if (range) return range;
    return null;
  };

  return (
    <div className="M1_Garand">
      <h2>M1 Garand Serial Number Lookup</h2>
      <p className="note-text">
        Note: some serial numbers made after 1945 may not work. 
      </p>

      <div className="side-images">
        <p className="side-image-text">Please press the button corresponding to your firearm and click submit</p>
        <div className="side-image-row">
          <div className="side-buttons-column">
            <button
              className="side-image-button"
              onClick={() => setSelectedFirearm("Springfield Armory")}
            >
              Springfield Armory
            </button>
            <button
              className="side-image-button"
              onClick={() => setSelectedFirearm("Winchester Repeating Arms Company")}
            >
              Winchester Repeating Arms Company
            </button>
            <button
              className="side-image-button"
              onClick={() => setSelectedFirearm("International Harvester")}
            >
              International Harvester
            </button>
            <button
              className="side-image-button"
              onClick={() => setSelectedFirearm("Rock Island Arsenal")}
            >
              Rock Island Arsenal
            </button>
            <button
              className="side-image-button"
              onClick={() => setSelectedFirearm("Harrington and Richardson")}
            >
              Harrington and Richardson
            </button>
          </div>

          <img 
            src="/images/M1_Garand_Company.png" 
            alt="M1 Example"
            className="side-image"
          />
        </div>
      </div>

      <form className="serial-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="serial-input"
          placeholder="Enter Serial Number"
          value={serialNumber}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length === 1 && /[Xx]/.test(value)) {
              setSerialNumber("X");
              return;
            }
            if (value.startsWith("X")) {
              value = "X" + value.slice(1).replace(/[^0-9,]/g, "");
              setSerialNumber(value);
              return;
            }
            value = value.replace(/[^0-9,]/g, "");
            setSerialNumber(value);
          }}
        />
        <button type="submit" className="serial-button">Submit</button>
      </form>

      <div className="input_and_output" ref={outputRef} tabIndex={-1}>
        {!submitted ? (
          <p>Information will be displayed here</p>
        ) : result ? (
          <div className={`serial-result ${pulse ? "pulse" : ""}`}>
            <p><strong>Manufacturer:</strong> {result.manufacturer}</p>
            <p><strong>Date:</strong> {result.date}</p>
            <p><strong>Range:</strong> {result.from.toLocaleString ? result.from.toLocaleString() : result.from} - {result.to.toLocaleString ? result.to.toLocaleString() : result.to}</p>
          </div>
        ) : (
          <p className={pulse ? "pulse" : ""}>No matching serial number found.</p>
        )}
        {selectedFirearm && (
          <p style={{ marginTop: "1rem" }} className={pulse ? "pulse" : ""}>
            <strong>Selected Company:</strong> {selectedFirearm}
          </p>
        )}
      </div>

      <Credits creditList={creditData} />
    </div>
  );
}

export default M1_Garand;
