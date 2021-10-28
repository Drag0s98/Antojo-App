import { useState, useEffect } from "react";

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState({
    latitude: 40.41811185571833,
    longitude: -3.7035610009072655,
  });
  const [error, setError] = useState(null);

  const onChange = ({ coords, timestamp }) => {
    try {
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        //   accuracy: coords.accuracy,
        //   speed: coords.speed,
        //   timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    let watcher = null;
    if (watch) {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings
      );
    } else {
      navigator.geolocation.getCurrentPosition(onChange, onError, settings);
    }

    return () => watcher && navigator.geolocation.clearWatch(watcher);
  }, [
    settings.enableHighAccuracy,
    settings.timeout,
    settings.maximumAge,
    watch,
    settings,
  ]);

  return { ...position, error };
};
