import { useState, useEffect, useRef } from "react";
import { useDrawer, useProperties, useStoreDetail } from "hooks";

interface Props {}

export const useGoogleMap = () => {
  const mapContainerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<
    { marker: google.maps.Marker; name: string }[]
  >([]);

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

  const { searchStoreDetail } = useGoogleMapSearch({ mapRef });
  const { properties, setProperties } = useProperties({
    mapRef,
    setMarkers,
    searchStoreDetail,
  });

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

const useGoogleMapSearch = ({ mapRef }) => {
  const serviceRef = useRef<google.maps.places.PlacesService>();
  const { handleDrawerOpen } = useDrawer();
  const { handleStoreDetail } = useStoreDetail();

  const searchStoreDetail = (name: string) => {
    handleDrawerOpen(true);

    const request: google.maps.places.TextSearchRequest = {
      location: mapRef.current!.getCenter(),
      radius: 500,
      query: name,
    };

    serviceRef.current = new google.maps.places.PlacesService(mapRef.current!);
    serviceRef.current.textSearch(request, (results, status) => {
      if (!results!.length) alert("해당 장소에 대한 정보를 찾지 못했습니다");
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(JSON.parse(JSON.stringify(results![0])));
        handleStoreDetail(JSON.parse(JSON.stringify(results![0])));
      }
    });
  };

  return { searchStoreDetail };
};
