import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { listLogEntry } from "./api";

const App = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.903275,
    longitude: -122.187991,
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const results = await listLogEntry();
      console.log("App.js 18: >>>", results);
    })();
  }, []);

  return (
    <div className="App">
      <ReactMapGL
        className="map"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapStyle="mapbox://styles/lucienspiff/ciksz7nzi006192kl156eyuke"
      />
    </div>
  );
};

export default App;
