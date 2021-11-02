import { useRef, useEffect } from "react";

export const useMap = () => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const mapContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (function initMap() {
      const initPosition = {
        center: { lat: 36.5, lng: 127.4 },
        zoom: 7,
      };

      mapRef.current = new google.maps.Map(
        mapContainerRef.current as HTMLElement,
        initPosition
      );
    })();
  }, []);

  return { map: mapRef, mapContainer: mapContainerRef };
};
