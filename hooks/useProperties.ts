import { useState, useEffect } from "react";
import { Feature } from "types/model";

export const useProperties = ({ map, setMarkers, searchStoreDetail }) => {
  const [properties, setProperties] = useState<Feature[]>([]);

  useEffect(() => {
    if (!properties.length) return;

    const markers = properties.map((prop) => {
      const [lng, lat] = prop.geometry.coordinates;
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map.current,
      });

      marker.addListener("click", () => {
        map.current!.setCenter(marker.getPosition() as google.maps.LatLng);

        searchStoreDetail(prop.properties.name);
      });
      return { marker, name: prop.properties.name };
    });

    setMarkers(markers);
  }, [properties]);

  return { properties, setProperties };
};