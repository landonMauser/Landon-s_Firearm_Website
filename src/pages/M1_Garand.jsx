import { useRef, useState } from "react";
import "../css/M1_Garand.css";
import Credits from "../components/Credits";

const exampleImages = [
  { src: "/images/M1-rear-sight_1st.png", label: "Image 1" },
  { src: "/images/chocolatecake.jpg", label: "Image 2" },
  { src: "/images/chocolatecake.jpg", label: "Image 3" }
];


// broken
const serialRanges = [
  // --- Springfield Armory ---
  { from: 1, to: 100000, manufacturer: "Springfield Armory" },

];


const creditData = [
  { name: "M1 Carbine source 1", url: "https://www.nps.gov/spar/learn/historyculture/u-s-m1-garand-rifle-production.htm" }
,
];

function M1_Garand() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const outputRef = useRef(null); //new
  const [selectedFirearm, setSelectedFirearm] = useState(""); //new

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const input = serialNumber.trim();
  
    // Allow numeric serials OR X-prefix serials
    const isValid =
      /^\d{1,10}$/.test(input.replace(/,/g, "")) ||   // regular numbers
      /^X\d{1,10}$/i.test(input);                     // Rock Island Arsenal

    if (!isValid) {
      setResult(null);
      setSubmitted(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
      if (outputRef.current) {
        outputRef.current.focus();
      }
      return;
    }

    const info = findSerialInfo(input);
    setResult(info);
    setSubmitted(true);

    setPulse(true);    
    setTimeout(() => setPulse(false), 500);
    if (outputRef.current) {
      outputRef.current.focus();
    }
  };

  const findSerialInfo = (serialNumber) => {
    const clean = serialNumber.trim();

    // --- Rock Island Arsenal check ---
    if (/^X\d+$/i.test(clean)) {
      const upper = clean.toUpperCase();

      const rockIslandRange = serialRanges.find(
        row =>
          typeof row.from === "string" &&
          typeof row.to === "string" &&
          upper >= row.from.toUpperCase() &&
          upper <= row.to.toUpperCase()
      );

      if (rockIslandRange) {
        return {
          manufacturer: rockIslandRange.manufacturer,
          date: rockIslandRange.date || "N/A",
          from: rockIslandRange.from,
          to: rockIslandRange.to
        };
      }

      return null; // no match for X-range
    }

    // --- Normal numeric serials ---
    const num = Number(clean.replace(/,/g, ""));
    if (isNaN(num)) return null;

    return serialRanges.find(
      row =>
        typeof row.from === "number" &&
        typeof row.to === "number" &&
        num >= row.from &&
        num <= row.to
    ) || null;
  };

return (
  <div className="M1_Garand">
    <h2>M1 Garand Serial Number Lookup</h2>
      <p className="note-text">
        Note: some serial numbers made after 1945 may not work.
      </p>
      <div className="side-images">
        <p className="side-image-text">Please press the button corresponding to your firearm</p>
        <div className="side-image-row">
          <div className="side-buttons-column">
            <button
              className="side-image-button"
              onClick={() => {
                setSelectedFirearm("m1");
                setPulse(true);           // trigger pulse
                setTimeout(() => setPulse(false), 500);
              }}
            >
              Top firearm
            </button>

            <button
              className="side-image-button"
              onClick={() => {
                setSelectedFirearm("m1a1");
                setPulse(true);
                setTimeout(() => setPulse(false), 500);
              }}
            >
              Middle firearm
            </button>

            <button
              className="side-image-button"
              onClick={() => {
                setSelectedFirearm("m2");
                setPulse(true);
                setTimeout(() => setPulse(false), 500);
              }}
            >
              Bottom firearm
            </button>

          </div>

          <img 
            src="/images/m1_to_m2.jpg" 
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

          // Allow "X" prefix (Rock Island Arsenal)
          if (value.length === 1 && /[Xx]/.test(value)) {
            setSerialNumber("X");
            return;
          }

          if (value.startsWith("X")) {
            // Allow digits + commas after X, strip everything else
            value = "X" + value.slice(1).replace(/[^0-9,]/g, "");
            setSerialNumber(value);
            return;
          }

          // Normal numeric serials — allow digits + commas
          value = value.replace(/[^0-9,]/g, "");
          setSerialNumber(value);
        }}

      />
      <button type="submit" className="serial-button">Submit</button>
    </form>

    <div
      className="input_and_output"
      ref={outputRef}
      tabIndex={-1} 
    >
      {!submitted ? (
        <p>Information will be displayed here</p>
      ) : result ? (
        <div className={`serial-result ${pulse ? "pulse" : ""}`}>
          <p><strong>Manufacturer:</strong> {result.manufacturer}</p>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Range:</strong> {result.from.toLocaleString()} - {result.to.toLocaleString()}</p>
        </div>
      ) : (
        <p className={pulse ? "pulse" : ""}>
          No matching serial number found.
        </p>
      )}
      {selectedFirearm && (
        <p 
          style={{ marginTop: "1rem" }} 
          className={pulse ? "pulse" : ""}
        >
          <strong>Type:</strong> {selectedFirearm}
        </p>
      )}
    </div>


    <Credits creditList={creditData} />
  </div>
);

}

export default M1_Garand;
