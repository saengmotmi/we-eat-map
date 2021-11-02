import { useState, useEffect, useRef } from "react";
import { useDrawer, useProperties, useStoreDetail } from "hooks";

export let map: google.maps.Map | null = null;
export type CustomMarker = { marker: google.maps.Marker; name: string };

export const useGoogleMap = () => {
  useInitGoogleMap();
  const [markers, setMarkers] = useState<CustomMarker[]>([]);

  const { storeDetail } = useStoreDetail();
  const { searchStoreDetail } = useGoogleMapSearch();

  return {
    storeDetail,
    markers,
    setMarkers,
    searchStoreDetail,
  };
};

const useGoogleMapSearch = () => {
  const serviceRef = useRef<google.maps.places.PlacesService>();
  const { handleDrawerOpen } = useDrawer();
  const { handleStoreDetail } = useStoreDetail();

  const searchStoreDetail = (name: string) => {
    handleDrawerOpen(true);

    const request: google.maps.places.TextSearchRequest = {
      location: map!.getCenter(),
      radius: 500,
      query: name,
    };

    serviceRef.current = new google.maps.places.PlacesService(map!);
    serviceRef.current.textSearch(request, (results, status) => {
      if (!results!.length) alert("해당 장소에 대한 정보를 찾지 못했습니다");
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        handleStoreDetail(results![0]);
      }
    });
  };

  return { searchStoreDetail };
};

const useInitGoogleMap = () => {
  useEffect(() => {
    (async function initMap() {
      const initPosition = {
        center: { lat: 36.5, lng: 127.4 },
        zoom: 7,
      };

      map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        initPosition
      );
    })();
  }, []);
};
