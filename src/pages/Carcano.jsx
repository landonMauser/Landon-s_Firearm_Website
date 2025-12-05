import { useRef, useState } from "react";
import "../css/Carcano.css";
import Credits from "../components/Credits";

const exampleImages = [
  { src: "/images/M1-rear-sight_1st.png", label: "Image 1" },
  { src: "/images/chocolatecake.jpg", label: "Image 2" },
  { src: "/images/chocolatecake.jpg", label: "Image 3" },
];

const serialRanges = [
  { from: 1, to: 5, manufacturer: "Inland Division, General Motors", date: "November 1941" },
  { from: 6, to: 10, manufacturer: "Winchester Repeating Arms", date: "December 1941" },
  { from: 11, to: 999999, manufacturer: "Inland Division, General Motors", date: "May 1942 - September 1943" },
  { from: 1000000, to: 1349999, manufacturer: "Winchester Repeating Arms", date: "September 1942 - February 1944" },
  { from: 1350000, to: 1449999, manufacturer: "Underwood, Elliott, Fisher", date: "November 1942 - July 1943" },
  { from: 1450000, to: 1549999, manufacturer: "National Postal Meter", date: "January 1943 - September 1943" },
  { from: 1550000, to: 1662519, manufacturer: "Quality Hardware Mfg. Corp", date: "February 1943 - May 1943" },
  { from: 1662520, to: 1762519, manufacturer: "Rock-ola Mfg. Corp", date: "November 1942 - November 1943" },
  { from: 1762520, to: 1875039, manufacturer: "Irwin Pedersen-Saginaw Gear", date: "March 1943 - September 1943" },
  { from: 1875040, to: 1937519, manufacturer: "Quality Hardware Mfg., Corp", date: "June 1943" },
  { from: 1937520, to: 1982519, manufacturer: "National Postal Meter", date: "October 1943 - November 1943" },
  { from: 1982520, to: 2352519, manufacturer: "Standard Products", date: "March 1943 - May 1944" },
  { from: 2352520, to: 2912519, manufacturer: "Underwood, Elliott, Fisher", date: "July 1943 - February 1944" },
  { from: 2912520, to: 3212519, manufacturer: "Inland Division, General Motors", date: "September 1943 - January 1944" },
  { from: 3212520, to: 3250519, manufacturer: "Irwin Pedersen-Saginaw Gear", date: "May 1943 - January 1944" },
  { from: 3250520, to: 3651519, manufacturer: "Saginaw (Saginaw) Division", date: "May 1943 - February 1944" },
  { from: 3651520, to: 4009999, manufacturer: "International Business Machines", date: "October 1943 - May 1944" },
  { from: 4010000, to: 4074999, manufacturer: "Underwood, Elliott, Fisher", date: "February 1944 - March 1944" },
  { from: 4075000, to: 4075009, manufacturer: "Winchester Repeating Arms", date: "February 1944" },
  { from: 4075010, to: 4432099, manufacturer: "National Postal Meter", date: "November 1943 - May 1944" },
  { from: 4432100, to: 4532099, manufacturer: "Quality Hardware", date: "July 1943 - August 1943" },
  { from: 4532100, to: 4632099, manufacturer: "Rock-Ola Mfg. Corporation", date: "November 1943 - March 1944" },
  { from: 4632100, to: 4879525, manufacturer: "Quality Hardware Mfg. Corp.", date: "September 1943 - May 1944" },
  { from: 4879526, to: 5549921, manufacturer: "Inland Division, General Motors", date: "January 1944 - August 1944" },
  { from: 5549222, to: 5834618, manufacturer: "Winchester Repeating Arms", date: "February 1944 - November 1944" },
  { from: 5834619, to: 6071188, manufacturer: "Saginaw (Saginaw) Division", date: "February 1944 - May 1944" },
  { from: 6071189, to: 6099688, manufacturer: "Rock-Ola Mfg. Corporation", date: "March 1944 - April 1944" },
  { from: 6099689, to: 6199688, manufacturer: "Underwood, Elliott, Fisher", date: "March 1944 - May 1944" },
  { from: 6199689, to: 6219688, manufacturer: "Rock-Ola Mfg. Corporation", date: "April 1944" },
  { from: 6219689, to: 6449867, manufacturer: "Inland Division, General Motors", date: "August 1944 - November 1944" },
  { from: 6449688, to: 6629833, manufacturer: "Winchester Repeating Arms", date: "November 1944 - January 1945" },
  { from: 6629834, to: 6664833, manufacturer: "Inland Division, General Motors", date: "November 1944 - January 1945" },
  { from: 6664834, to: 7234883, manufacturer: "Inland Division, General Motors", date: "January 1945 - August 1945" },
  { from: 7234884, to: 7369660, manufacturer: "Winchester Repeating Arms", date: "January 1945 - September 1945" },
  { from: 7369661, to: 8069660, manufacturer: "Inland Division, General Motors", date: "January 1945 - August 1945" }
];



const creditData = [
  { name: "M1 Carbine source 1", url: "https://www.militaria-deal.com/militaria-blog/ww2-m1-carbine-guide" },
  { name: "M1 Carbine source 2", url: "http://www.uscarbinecal30.com/serialnumbers.html" },
  { name: "M1 Carbine source 3", url: "https://gunsmagazine.com/our-experts/m1-m1a1-m2-carbines" },
  { name: "Historical Reading", url: "https://ia801400.us.archive.org/28/items/the-m1-carbine-leroy-thompson/vdoc.pub_the-m1-carbine-weapon-.pdf" },
];

function Carcano() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const outputRef = useRef(null); //new
  const [selectedFirearm, setSelectedFirearm] = useState(""); //new

  
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
  <div className="Carcano">
    <h2>M1, M1A1, and M2 Carbine Serial Number Lookup</h2>
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
          const sanitized = e.target.value.replace(/[^\d,]/g, "");
          setSerialNumber(sanitized);
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

export default Carcano;
