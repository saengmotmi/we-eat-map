import { RefObject } from "react";
import { Properties } from "types/model";

interface Props extends Properties {
  mapRef: RefObject<google.maps.Map>;
  markers: { marker: google.maps.Marker; name: string }[];
  searchStoreDetail: (keyword: string) => void;
}

export default function List({
  name,
  markers,
  mapRef,
  searchStoreDetail,
}: Props) {
  return (
    <li
      onClick={() => {
        const marker = markers.find((marker) => marker.name === name);

        mapRef.current!.setCenter(
          marker?.marker.getPosition() as google.maps.LatLng
        );
        searchStoreDetail(name);
      }}
    >
      {name}
    </li>
  );
}
