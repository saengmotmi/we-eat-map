import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Feature } from "types/model";

interface Props {
  setIsTabOpen: Dispatch<SetStateAction<boolean>>;
}

export const useGoogleMap = ({ setIsTabOpen }: Props) => {
  const mapContainerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const serviceRef = useRef<google.maps.places.PlacesService>();
  const [markers, setMarkers] = useState<
    { marker: google.maps.Marker; name: string }[]
  >([]);
  const [properties, setProperties] = useState<Feature[]>([]);
  const [storeDetail, setStoreDetail] =
    useState<google.maps.places.PlaceResult>({});

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

  useEffect(() => {
    if (!properties.length) return;

    const markers = properties.map((prop) => {
      const [lng, lat] = prop.geometry.coordinates;
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: mapRef.current,
      });

      marker.addListener("click", () => {
        mapRef.current!.setCenter(marker.getPosition() as google.maps.LatLng);

        searchStoreDetail(prop.properties.name);
      });
      return { marker, name: prop.properties.name };
    });

    setMarkers(markers);
  }, [properties]);

  const searchStoreDetail = (name: string) => {
    setIsTabOpen(true);

    const request: google.maps.places.TextSearchRequest = {
      location: mapRef.current!.getCenter(),
      radius: 500,
      query: name,
    };

    serviceRef.current = new google.maps.places.PlacesService(mapRef.current!);
    serviceRef.current.textSearch(request, (results, status) => {
      if (!results!.length) alert("해당 장소에 대한 정보를 찾지 못했습니다");
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setStoreDetail(results![0]);
      }
    });
  };

  return {
    properties,
    storeDetail,
    mapRef,
    mapContainerRef,
    markers,
    setProperties,
    searchStoreDetail,
  };
};
