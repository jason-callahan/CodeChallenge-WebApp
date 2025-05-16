import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { CityTime } from "./components/CityTime";

const defaultCities = [
  { city: "Local", offset: 0 },
  { city: "SLC", offset: -2 },
  { city: "Austin", offset: 1 },
  { city: "UTC", offset: 4 },
  { city: "Belgrade", offset: 6 },
  { city: "Hanoi", offset: 11 }
];

function App() {
  const [cities] = useState(defaultCities);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      {/* <Typography variant="h3" gutterBottom>
        World Clock
      </Typography> */}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {cities.map((c) => (
          <CityTime key={c.city} city={c.city} offset={c.offset} />
        ))}
      </Box>
    </Container>
  );
}

export default App;
