import { useRef, useState } from "react";
import "../css/Krag_Jorgensen.css";
import Credits from "../components/Credits";

const serialRanges = [
  { from: 1, to: 2953, manufacturer: "Springfield", date: "1894" },
  { from: 2954, to: 16384, manufacturer: "Springfield", date: "1895" },
  { from: 16385, to: 32647, manufacturer: "Springfield", date: "1896" },
  { from: 32648, to: 64557, manufacturer: "Springfield", date: "1897" },
  { from: 64558, to: 116146, manufacturer: "Springfield", date: "1897" },
  { from: 116147, to: 219925, manufacturer: "Springfield", date: "1899" },
  { from: 219926, to: 290578, manufacturer: "Springfield", date: "1900" },
  { from: 290579, to: 345318, manufacturer: "Springfield", date: "1901" },
  { from: 345319, to: 398565, manufacturer: "Springfield", date: "1902" },
  { from: 398566, to: 460407, manufacturer: "Springfield", date: "1903" },
  { from: 460408, to: 477762, manufacturer: "Springfield", date: "1904" },
];


const creditData = [
  { name: "Krag–Jørgensen source 1", url: "https://www.nps.gov/spar/learn/historyculture/u-s-springfield-krag-jorgensen-rifle-production-numbers.htm" },
  { name: "Krag–Jørgensen source 2", url: "https://surplused.com/index.php/2014/05/29/a-quick-and-dirty-guide-military-krag-jorgensen-rifles/" },
  { name: "Krag–Jørgensen source 3", url: "https://en.wikipedia.org/wiki/Krag%E2%80%93J%C3%B8rgensen" },
];

function Krag_Jorgensen() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const outputRef = useRef(null); 
  const [selectedFirearm, setSelectedFirearm] = useState(""); 

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const input = serialNumber.trim();
  
    if (!/^\d{1,10}$/.test(input.replace(/,/g, ""))) {
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
    const cleanNumber = serialNumber.replace(/,/g, "");
    const num = Number(cleanNumber);
    if (isNaN(num)) return null;
    return serialRanges.find(row => num >= row.from && num <= row.to) || null;
  };

return (
  <div className="Krag_Jorgensen">
    <h2>Krag–Jørgensen Serial Number Lookup</h2>
      <p className="note-text">
        Note: the serial number lookup will only work for Springfield rifles.
      </p>
      <div className="side-images">
        <p className="side-image-text">Please press the button corresponding to your firearm</p>
        <div className="side-image-row">
          <div className="side-buttons-column">
            <button
              className="side-image-button"
              onClick={() => {
                setSelectedFirearm("m1");
                setPulse(true);
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
          const sanitized = e.target.value.replace(/[^\d,]/g, "");
          setSerialNumber(sanitized);
        }}
      />
      <button type="submit" className="serial-button">Submit</button>
    </form>

    <div
      className="input_and_output"
      ref={outputRef}
      tabIndex={-1}  /* required so div can receive focus */
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

export default Krag_Jorgensen;
