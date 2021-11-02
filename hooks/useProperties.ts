import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { map, CustomMarker } from "./useGoogleMap";
import { Welcome, Feature } from "types/model";

interface Props {
  setMarkers: Dispatch<SetStateAction<CustomMarker[]>>;
  searchStoreDetail: (keyword: string) => void;
}

// KMZ에서 온 데이터들 -> property랑 marker 합쳐야 함
export const useProperties = ({ setMarkers, searchStoreDetail }: Props) => {
  const [properties, setProperties] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const res: Welcome = await fetch("/api/markers").then((res) =>
        res.json()
      );

      setProperties(res.features);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!properties.length) return;

    const markers = properties.map(makeMarker);
    setMarkers(markers);

    console.log(properties);
    console.log(markers);

    function makeMarker(prop: Feature) {
      const [lng, lat] = prop.geometry.coordinates;
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
      });

      marker.addListener("click", clickMarker);

      return { marker, name: prop.properties.name };

      function clickMarker() {
        map!.setCenter(marker.getPosition() as google.maps.LatLng);
        searchStoreDetail(prop.properties.name);
      }
    }
  }, [properties]);

  return { properties, isLoading };
};
