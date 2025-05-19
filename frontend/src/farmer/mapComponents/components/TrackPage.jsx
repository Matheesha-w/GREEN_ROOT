import React, { useEffect, useState } from "react";
import MapTracking from "./MapTracking";
import axios from "axios";

function TrackPage() {
  const [xcor, setLat] = useState(null);
  const [ycor, setLon] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/v1/field/parameters", {
        farmerID: "67d61777badc1ba1639ca218",
      })
      .then((res) => {
        setLat(res.data.data[0].xcordinate);
        setLon(res.data.data[0].ycordinate);
      });
  }, []);

  return (
    <div>
      <MapTracking
        from={{ lat: 6.9271, lng: 79.8612 }}
        to={{ lat: xcor, lng: ycor }}
      />
    </div>
  );
}

export default TrackPage;
