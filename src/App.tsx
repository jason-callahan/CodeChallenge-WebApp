import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { CitySearch } from "./components/CitySearch";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import type { CityResult } from "./libs/open-meteo/citySearch";
import { ThemeContextProvider } from "./theme";

import "./App.scss";
import { ThemeToggleButton } from "./components/ThemeToggle";
import { AccessTime } from "@mui/icons-material";

const defaultCities: CityResult[] = [
  {
    id: 4460243,
    name: "Charlotte",
    latitude: 35.22709,
    longitude: -80.84313,
    elevation: 229,
    feature_code: "PPLA2",
    country_code: "US",
    timezone: "America/New_York",
    population: 874579,
    postcodes: [
      "28201", "28202", "28203", "28204", "28205", "28206", "28207", "28208",
      "28209", "28210", "28211", "28212", "28213", "28214", "28215", "28216",
      "28217", "28218", "28219", "28220", "28221", "28222", "28223", "28224",
      "28226", "28227", "28228", "28229", "28230", "28231", "28232", "28233",
      "28234", "28235", "28236", "28237", "28241", "28242", "28243", "28244",
      "28246", "28247", "28250", "28253", "28254", "28255", "28256", "28258",
      "28260", "28262", "28265", "28266", "28269", "28270", "28272", "28273",
      "28274", "28275", "28277", "28278", "28280", "28281", "28282", "28284",
      "28285", "28287", "28288", "28289", "28290", "28296", "28297", "28299",
      "28263"
    ],
    country_id: 6252001,
    country: "United States",
    admin1: "North Carolina",
    admin2: "Mecklenburg"
  },
  {
    id: 792680,
    name: "Belgrade",
    latitude: 44.80401,
    longitude: 20.46513,
    elevation: 120,
    feature_code: "PPLC",
    country_code: "RS",
    timezone: "Europe/Belgrade",
    population: 1273651,
    country_id: 6290252,
    country: "Serbia",
    admin1: "Central Serbia",
    admin2: "Belgrade"
  },
  {
    id: 5780993,
    name: "Salt Lake City",
    latitude: 40.76078,
    longitude: -111.89105,
    elevation: 1299,
    feature_code: "PPLA",
    country_code: "US",
    timezone: "America/Denver",
    population: 215548,
    postcodes: [
      "84101", "84102", "84103", "84104", "84105", "84106", "84107", "84108",
      "84109", "84110", "84111", "84112", "84113", "84114", "84115", "84116",
      "84117", "84118", "84121", "84122", "84123", "84124", "84125", "84126",
      "84127", "84130", "84131", "84132", "84133", "84134", "84136", "84138",
      "84139", "84141", "84143", "84145", "84147", "84148", "84150", "84151",
      "84152", "84157", "84158", "84165", "84170", "84171", "84180", "84184",
      "84189", "84190", "84199"
    ],
    country_id: 6252001,
    country: "United States",
    admin1: "Utah",
    admin2: "Salt Lake"
  },
  {
    id: 1581130,
    name: "Hanoi",
    latitude: 21.0245,
    longitude: 105.84117,
    elevation: 10,
    feature_code: "PPLC",
    country_code: "VN",
    timezone: "Asia/Bangkok",
    population: 8053663,
    country_id: 1562822,
    country: "Vietnam",
    admin1: "Hanoi",
    admin2: "Hanoi"
  }
];

function App() {
  // Load saved cities (if any) from localStorage
  const [cities, setCities] = useState<CityResult[]>(() => {
    try {
      const stored = localStorage.getItem("cities");
      if (stored) {
        const parsed = JSON.parse(stored) as CityResult[];
        return parsed.filter(
          (city) => city.latitude != null && city.longitude != null
        );
      }
      return defaultCities;
    } catch {
      return defaultCities;
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
