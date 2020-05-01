import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntry } from "./api";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./App.module.css";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.903275,
    longitude: -122.187991,
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntry();
      setLogEntries(logEntries);
    })();
  }, []);

  const showAddMarkerPopup = (evt) => {
    const [longitude, latitude] = evt.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapStyle="mapbox://styles/lucienspiff/ck9nxl5bj0qjy1iuowassw996"
        onDblClick={showAddMarkerPopup}
      >
        {logEntries.map((entry) => (
          <div key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              key={entry._id}
            >
              <div
                onClick={() =>
                  setShowPopup({
                    // ...showPopup,
                    [entry._id]: true,
                  })
                }
              >
                <svg
                  className={styles.marker}
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                    strokeWidth: "2",
                  }}
                  fill="none"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeonClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup()}
                anchor="top"
              >
                <div className={styles.popup}>
                  <h4>{entry.title}</h4>
                  <p style={{ fontStyle: "italic" }}>{entry.comments}</p>
                  <small>
                    Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                </div>
              </Popup>
            ) : null}
          </div>
        ))}
        {addEntryLocation ? (
          <div>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <svg
                  className={styles.marker}
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                    strokeWidth: "2",
                  }}
                  fill="none"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeonClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className={""}>
                <h3>Add your new log entry</h3>
              </div>
            </Popup>
          </div>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default App;
