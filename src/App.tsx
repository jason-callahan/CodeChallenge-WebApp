import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { CitySearch } from "./components/CitySearch";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import type { CityResult } from "./libs/open-meteo/citySearch";
import { ThemeContextProvider } from "./theme";

import "./App.scss";
import { ThemeToggleButton } from "./components/ThemeToggle";
import { AccessTime } from "@mui/icons-material";

function App() {
  // Load saved cities (if any) from localStorage
  const [cities, setCities] = useState<CityResult[]>(() => {
    try {
      const stored = localStorage.getItem("cities");
      if (!stored) return [];

      const parsed = JSON.parse(stored) as CityResult[];
      return parsed.filter(
        (city) => city.latitude != null && city.longitude != null
      );
    } catch {
      return [];
    }
  });

  // Save cities to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cities", JSON.stringify(cities));
    } catch {
      // if storage quota is exceeded or unavailable, you might handle it here
    }
  }, [cities]);

  return (
    <ThemeContextProvider>
      <div>
        <header>
          <AccessTime />
          <CitySearch
            onSelect={(city) => {
              setCities((prev) =>
                prev.find((c) => c.id === city.id) ? prev : [...prev, city]
              );
            }}
          />
          <ThemeToggleButton />
        </header>

        <Container className="world-clock">
          {cities.length > 0 && (
            <div className="weather-card-grid">
              {cities.map((city) => (
                <WeatherCard key={city.id} city={city} onRemove={() => {
                  setCities(prev =>
                    prev.filter(c => c.id !== city.id)
                  );
                }} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
