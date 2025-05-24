import { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Stack,
  Typography
} from "@mui/material";
import { CitySearch } from "./components/CitySearch";
import { WeatherCard } from "./components/WeatherCard";
import type { CityResult } from "./libs/open-meteo/citySearch";

import "./App.scss";


function App() {

  const [cities, setCities] = useState<CityResult[]>([]);

  return (
    <Container className="world-clock">
      <Typography variant="h4" gutterBottom>
        World Clock
      </Typography>

      <CitySearch
        onSelect={(city) => {
          setCities((prev) =>
            prev.find((c) => c.id === city.id) ? prev : [...prev, city]
          );
        }}
      />

      {cities.length > 0 && (
        <div className="weather-card-grid">
          {cities.map((city) => (
            <WeatherCard key={city.id} city={city} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default App;
