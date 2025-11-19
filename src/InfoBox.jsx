import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

import "./Info.css";

export default function InfoBox({ info }) {
  const HOT_URL = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?w=600&auto=format&fit=crop&q=60";
  const COLD_URL = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=600&auto=format&fit=crop&q=60";
  const RAIN_URL = "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=60";

  const WeatherIcon =
    info.humidity > 80
      ? ThunderstormIcon
      : info.temp > 15
      ? WbSunnyIcon
      : AcUnitIcon;

  const imageUrl =
    info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL;

  // Always show the city name you searched for
  const cityName = info.city && info.city.trim() ? info.city : "";

  return (
    <div className="InfoBox">
      <h1>Weather Info</h1>
      <div className="cardContainer">
        <Card sx={{ maxWidth: 370, borderRadius: "20px", boxShadow: "0 12px 28px rgba(0,0,0,0.15)" }}>
          <CardMedia
            sx={{ height: 180, borderRadius: "20px 20px 0 0" }}
            image={imageUrl}
            title="Weather Image"
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: 1, color: "#2c3e50", fontWeight: 700 }}
            >
              {cityName}
              <WeatherIcon sx={{ fontSize: 40, color: "#fbbf24" }} />
            </Typography>

            <Typography variant="body1" component="div" sx={{ mt: 1, color: "#475569" }}>
              <p>
                <OpacityIcon sx={{ verticalAlign: "middle", color: "#3b82f6", mr: 0.5 }} />
                Humidity: <span className="value">{info.humidity}%</span>
              </p>

              <p>
                <ThermostatIcon sx={{ verticalAlign: "middle", color: "#ef4444", mr: 0.5 }} />
                Min Temp: <span className="value">{info.tempMin}&deg;C</span>
              </p>

              <p>
                <ThermostatIcon sx={{ verticalAlign: "middle", color: "#fbbf24", mr: 0.5 }} />
                Max Temp: <span className="value">{info.tempMax}&deg;C</span>
              </p>

              <p className="weather-summary" style={{ marginTop: 24 }}>
                <FilterDramaIcon sx={{ verticalAlign: "middle", color: "#6b7280", mr: 0.5 }} />
                The weather can be described as <i>{info.weather}</i> and feels like{" "}
                <span className="value">{info.feelslike}&deg;C</span>
              </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
