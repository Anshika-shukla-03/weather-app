import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8abc4c75f3e1c92d4f7bdadff980d635";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
       
        throw new Error("City not found");
      }
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        city: city,  
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like,   
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      setError(false);
      return result;
    } catch (err) {
      setError(true);
      return null; 
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!city) return; 
    let newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
      setCity(""); 
    }
  };

  return (
    <div className="SearchBox">
      <h3>Search for the weather</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">Search</Button>
        {error && (
          <p style={{color:"red", marginTop:"12px"}}>
            No such place exists! Please enter a valid city name.
          </p>
        )}
      </form>
    </div>
  );
}
