import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useDrawer, useProperties, useStoreDetail, useMap } from "hooks";
import { mapState } from "store/map/atom";

interface Props {}

export const useGoogleMap = () => {
  const [markers, setMarkers] = useState<
    { marker: google.maps.Marker; name: string }[]
  >([]);

  const { map, mapContainer } = useMap();
  const { storeDetail } = useStoreDetail();

  const { searchStoreDetail } = useGoogleMapSearch({ map });
  const { properties, setProperties } = useProperties({
    map,
    setMarkers,
    searchStoreDetail,
  });

  return {
    properties,
    storeDetail,
    map,
    mapContainer,
    markers,
    setProperties,
    searchStoreDetail,
  };
};

const useGoogleMapSearch = ({ map }) => {
  const serviceRef = useRef<google.maps.places.PlacesService>();
  const { handleDrawerOpen } = useDrawer();
  const { storeDetail, handleStoreDetail } = useStoreDetail();

  const searchStoreDetail = (name: string) => {
    handleDrawerOpen(true);

    const request: google.maps.places.TextSearchRequest = {
      location: map!.current!.getCenter(),
      radius: 500,
      query: name,
    };

    serviceRef.current = new google.maps.places.PlacesService(map!.current!);
    serviceRef.current.textSearch(request, (results, status) => {
      if (!results!.length) alert("해당 장소에 대한 정보를 찾지 못했습니다");
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        handleStoreDetail(results![0]);
      }
    });
  };

  return { searchStoreDetail };
};
