import { map } from "hooks/useGoogleMap";
import { Properties } from "types/model";

interface Props extends Properties {
  markers: { marker: google.maps.Marker; name: string }[];
  searchStoreDetail: (keyword: string) => void;
}

export default function List({ name, markers, searchStoreDetail }: Props) {
  return (
    <li
      onClick={() => {
        const marker = markers.find((marker) => marker.name === name);

        map!.setCenter(marker?.marker.getPosition() as google.maps.LatLng);
        searchStoreDetail(name);
      }}
    >
      {name}
    </li>
  );
}
