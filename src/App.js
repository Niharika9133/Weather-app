import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "4bccfb78de47eb0154bde7567e37375c"; 
  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
  
      if (res.ok) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message || "City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Unable to fetch weather. Check your internet.");
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>
      <h1>Weather</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: "8px 12px",
          marginLeft: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;