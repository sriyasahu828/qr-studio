import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import "./App.css";
import confetti from "canvas-confetti";

function App() {
  const [qrType, setQrType] = useState("url");
const [size, setSize] = useState(300);
const [foreground, setForeground] = useState("#000000");
const [background, setBackground] = useState("#ffffff");
const [margin, setMargin] = useState(10);
const [errorLevel, setErrorLevel] = useState("M");
const [text, setText] = useState("");
const [email, setEmail] = useState("");
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");
const [ssid, setSsid] = useState("");
const [password, setPassword] = useState("");
const [security, setSecurity] = useState("WPA");
const [error, setError] = useState("");
const [scanWarning, setScanWarning] = useState("");
const [history, setHistory] = useState([]);

const applyTheme = (theme) => {
  switch (theme) {
    case "classic":
      setForeground("#000000");
      setBackground("#ffffff");
      setMargin(10);
      break;

    case "dark":
      setForeground("#ffffff");
      setBackground("#121212");
      setMargin(15);
      break;

    case "ocean":
      setForeground("#0077b6");
      setBackground("#caf0f8");
      setMargin(20);
      break;

    case "neon":
      setForeground("#39ff14");
      setBackground("#000000");
      setMargin(20);
      break;

    default:
      break;
  }
};
const saveToHistory = () => {
  let content = "";

  switch (qrType) {
    case "url":
    case "text":
      content = text;
      break;

    case "email":
      content = email;
      break;

    case "phone":
      content = phone;
      break;

    case "wifi":
      content = ssid;
      break;

    default:
      break;
  }

  const newItem = {
    type: qrType,
    content,
    time: new Date().toLocaleString(),
  };

  const updatedHistory = [
    newItem,
    ...history,
  ].slice(0, 5);

  setHistory(updatedHistory);

  localStorage.setItem(
    "qrHistory",
    JSON.stringify(updatedHistory)
  );
};
const downloadQR = (format) => {
  saveToHistory();
  qrCode.current.download({
    extension: format,
    name: "qr-studio-code",
  });
};
const launchFireworks = () => {
  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
    });
  }, 300);
};

  const qrRef = useRef(null);
  const qrCode = useRef(
    new QRCodeStyling({
      width: size,
      height: size,
      data: text,
      dotsOptions: {
        color: "#000000",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    })
  );
  useEffect(() => {
  if (qrRef.current) {
    qrCode.current.append(qrRef.current);
  }
}, []);

useEffect(() => {
  const savedHistory =
    JSON.parse(localStorage.getItem("qrHistory")) || [];

  setHistory(savedHistory);
}, []);

  useEffect(() => {
  let qrData = "";

  switch (qrType) {
    case "url":
      qrData = text;
      break;

    case "text":
      qrData = text;
      break;

    case "email":
      qrData = `mailto:${email}?subject=${subject}&body=${message}`;
      break;

    case "phone":
      qrData = `tel:${phone}`;
      break;

    case "wifi":
      qrData = `WIFI:T:${security};S:${ssid};P:${password};;`;
      break;

    default:
      qrData = "";
  }

  qrCode.current.update({
  data: qrData,
  width: Number(size),
  height: Number(size),
  margin: Number(margin),

  dotsOptions: {
    color: foreground,
  },

  backgroundOptions: {
    color: background,
  },

  qrOptions: {
    errorCorrectionLevel: errorLevel,
  },
});
 }, [
  qrType,
  text,
  email,
  subject,
  message,
  phone,
  ssid,
  password,
  security,
  size,
  foreground,
  background,
  margin,
  errorLevel,
]); 


useEffect(() => {
  setError("");

  if (qrType === "url") {
    if (
      text &&
      !/^https?:\/\/.+/i.test(text)
    ) {
      setError(
        "URL must start with http:// or https://"
      );
    }
  }

  if (qrType === "email") {
    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError("Enter a valid email address");
    }
  }

  if (qrType === "phone") {
    if (
      phone &&
      !/^[0-9]{10}$/.test(phone)
    ) {
      setError(
        "Phone number must contain exactly 10 digits"
      );
    }
  }

  if (qrType === "wifi") {
    if (!ssid.trim()) {
      setError("Wi-Fi name cannot be empty");
    }
  }
}, [
  qrType,
  text,
  email,
  phone,
  ssid
]);
useEffect(() => {
  if (
    foreground.toLowerCase() ===
    background.toLowerCase()
  ) {
    setScanWarning(
      "⚠ Low contrast colors may make the QR difficult to scan."
    );
  } else {
    setScanWarning("");
  }
}, [foreground, background]);

  return (
    <div className="container">
      <section className="hero">
  <div className="hero-left">
    <h1>QR Studio</h1>

    <h2>
      Generate Professional QR Codes For
      Anything
    </h2>

    <p>
      Create custom QR codes for URLs,
      Text, Email, Phone Numbers and Wi-Fi
      with powerful customization and
      instant downloads.
    </p>

    <button className="hero-btn">
      Start Creating
    </button>
  </div>

  <div className="hero-right">
    <img
  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=QRStudio"
  alt="QR Preview"
/>
  </div>
</section>
<section className="features">

  <div className="feature-card">
    <h3>🔗 Multiple QR Types</h3>
    <p>
      Generate QR codes for URLs, Text,
      Email, Phone Numbers and Wi-Fi.
    </p>
  </div>

  <div className="feature-card">
    <h3>🎨 Full Customization</h3>
    <p>
      Customize colors, size, margin
      and error correction levels.
    </p>
  </div>

  <div className="feature-card">
    <h3>⚡ Instant Downloads</h3>
    <p>
      Download your QR codes instantly
      in PNG and SVG formats.
    </p>
  </div>

  <div className="feature-card">
    <h3>📱 Responsive Design</h3>
    <p>
      Works seamlessly across desktop,
      tablet and mobile devices.
    </p>
  </div>

</section>
<section className="stats">

  <div className="stat-card">
    <h2>5+</h2>
    <p>QR Types</p>
  </div>

  <div className="stat-card">
    <h2>4</h2>
    <p>Theme Presets</p>
  </div>

  <div className="stat-card">
    <h2>2</h2>
    <p>Download Formats</p>
  </div>

  <div className="stat-card">
    <h2>100%</h2>
    <p>Responsive</p>
  </div>

</section>
<div className="generator-section" id="generator">
      <select
  value={qrType}
  onChange={(e) => setQrType(e.target.value)}
>
  <option value="url">URL</option>
  <option value="text">Plain Text</option>
  <option value="email">Email</option>
  <option value="phone">Phone Number</option>
  <option value="wifi">Wi-Fi</option>
</select>
     {qrType === "url" && (
  <input
    type="text"
    placeholder="Enter Website URL"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
)}

{qrType === "text" && (
  <input
    type="text"
    placeholder="Enter Text"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
)}

{qrType === "email" && (
  <>
    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="text"
      placeholder="Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    />

    <input
      type="text"
      placeholder="Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
  </>
)}

{qrType === "phone" && (
  <input
    type="text"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
)}

{qrType === "wifi" && (
  <>
    <input
      type="text"
      placeholder="Wi-Fi Name (SSID)"
      value={ssid}
      onChange={(e) => setSsid(e.target.value)}
    />

    <input
      type="text"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <select
      value={security}
      onChange={(e) => setSecurity(e.target.value)}
    >
      <option value="WPA">WPA</option>
      <option value="WEP">WEP</option>
      <option value="nopass">No Password</option>
    </select>
  </>
)}
</div>
<div className="customization">
  <h3>Customize QR</h3>

  <div className="themes">
  <button onClick={() => applyTheme("classic")}>
    Classic
  </button>

  <button onClick={() => applyTheme("dark")}>
    Dark
  </button>

  <button onClick={() => applyTheme("ocean")}>
    Ocean
  </button>

  <button onClick={() => applyTheme("neon")}>
    Neon
  </button>
</div>

  <label>
    Size
    <input
      type="range"
      min="200"
      max="500"
      value={size}
      onChange={(e) => setSize(e.target.value)}
    />
  </label>

  <label>
    Foreground Color
    <input
      type="color"
      value={foreground}
      onChange={(e) => setForeground(e.target.value)}
    />
  </label>

  <label>
    Background Color
    <input
      type="color"
      value={background}
      onChange={(e) => setBackground(e.target.value)}
    />
  </label>

  <label>
    Margin
    <input
      type="number"
      min="0"
      max="50"
      value={margin}
      onChange={(e) => setMargin(e.target.value)}
    />
  </label>

  <label>
    Error Correction
    <select
      value={errorLevel}
      onChange={(e) => setErrorLevel(e.target.value)}
    >
      <option value="L">Low</option>
      <option value="M">Medium</option>
      <option value="Q">Quartile</option>
      <option value="H">High</option>
    </select>
  </label>
</div>
{error && (
  <p className="error">
    {error}
  </p>
)}
{scanWarning && (
  <p className="warning">
    {scanWarning}
  </p>
)}

      <div ref={qrRef}></div>
      <div className="download-buttons">
 <button
  onClick={() => {
    launchFireworks();

    setTimeout(() => {
      downloadQR("png");
    }, 1000);
  }}
>
  

  Download PNG
</button>

  <button
  onClick={() => {
    launchFireworks();

    setTimeout(() => {
      downloadQR("svg");
    }, 1000);
  }}
>
  Download SVG
</button>
</div>
<div className="history">
  <h3>Recent QR Codes</h3>

  {history.length === 0 ? (
    <p>No history yet</p>
  ) : (
    history.map((item, index) => (
      <div key={index} className="history-item">
        <strong>{item.type}</strong>

        <p>{item.content}</p>

        <small>{item.time}</small>
      </div>
    ))
  )}
</div>
<footer className="footer">
  <p>
    Built with React & QRCodeStyling • QR Studio 2026
  </p>
</footer>
    </div>
  );
}

export default App;