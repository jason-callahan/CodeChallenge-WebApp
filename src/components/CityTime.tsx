// src/components/CityTime.tsx
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./CityTime.scss";

interface CityTimeProps {
  city: string;
  offset: number;
  onRemove: (city: string) => void;
}

export const CityTime = (props: CityTimeProps) => {
  const { city, offset, onRemove } = props;
  const [timeParts, setTimeParts] = useState({ hm: "", sec: "" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Create a new date adjusted to UTC + offset
      const local = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours() + offset,
        now.getUTCMinutes(),
        now.getUTCSeconds()
      ));

      const localeTime = local.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const [hhmm, ss] = localeTime.split(/:(?=[^:]*$)/); // Split on last colon
      setTimeParts({ hm: hhmm, sec: ss });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [offset]);

  return (
    <Card className="citytime-card">
      <CardContent>
        <div className="card-header">
          <Typography variant="h6" className="city-name">
            {city} <span className="offset">({offset >= 0 ? `+${offset}` : offset})</span>
          </Typography>
          <button
            className="remove-button"
            onClick={() => onRemove(city)}
            aria-label={`Remove ${city}`}
          >
            ×
          </button>
        </div>

        <Typography variant="h4" className="time-display">
          {timeParts.hm}
          <span className="seconds">:{timeParts.sec}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

