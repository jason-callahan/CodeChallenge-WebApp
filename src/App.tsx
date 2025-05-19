import { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { CityTime } from "./components/CityTime";
import "./App.scss";

interface City {
  city: string;
  offset: number;
}

const defaultCities: City[] = [
  { city: "Charlotte", offset: 0 },
  { city: "SLC", offset: -2 },
  { city: "Austin", offset: -1 },
  { city: "UTC", offset: 4 },
  { city: "Belgrade", offset: 6 },
  { city: "Hanoi", offset: 11 }
];

function App() {
  const [cities, setCities] = useState<City[]>(() => {
    const saved = localStorage.getItem("cities");
    return saved ? JSON.parse(saved) : defaultCities;
  });
  const [newCity, setNewCity] = useState("");
  const [newOffset, setNewOffset] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const handleAddCity = () => {
    const offsetNum = parseInt(newOffset, 10);
    if (!newCity || isNaN(offsetNum)) return;

    setCities([...cities, { city: newCity, offset: offsetNum }]);
    setNewCity("");
    setNewOffset("");
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setCities((prev) => prev.filter((c) => c.city !== cityToRemove));
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      {/* <Typography variant="h4" gutterBottom>World Clock</Typography> */}

      <Button
        size="small"
        variant="outlined"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Hide Form" : "Add"}
      </Button>

      {showForm && (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <TextField
            label="City"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="textfield_dark"
          />
          <TextField
            label="Offset"
            value={newOffset}
            onChange={(e) => setNewOffset(e.target.value)}
            type="number"
            className="textfield_dark"
          />
          <Button variant="contained" onClick={handleAddCity}>
            Add
          </Button>
        </Stack>
      )}


      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {cities.map((c) => (
          <CityTime
            key={`${c.city}-${c.offset}`}
            city={c.city}
            offset={c.offset}
            onRemove={handleRemoveCity}
          />
        ))}
      </Box>
    </Container>
  );
}

export default App;
