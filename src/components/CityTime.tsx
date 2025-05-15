// src/components/CityTime.tsx
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CityTimeProps {
  city: string;
  offset: number; // in hours from UTC
}

export const CityTime = ({ city, offset }: CityTimeProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalTime = (): string => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const local = new Date(utc + 3600000 * offset);
    return local.toLocaleTimeString();
  };

  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Typography variant="h6">{city}</Typography>
        <Typography variant="h4">{getLocalTime()}</Typography>
      </CardContent>
    </Card>
  );
};
