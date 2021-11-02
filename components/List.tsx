import { map, CustomMarker } from "hooks/useGoogleMap";
import { Properties } from "types/model";

interface Props extends Properties {
  markers: CustomMarker[];
  searchStoreDetail: (keyword: string) => void;
}

export default function List({ name, markers, searchStoreDetail }: Props) {
  return (
    <li
      onClick={() => {
        const marker = markers.find(
          ({ property }) => property.properties.name === name
        );

        map!.setCenter(marker?.marker.getPosition() as google.maps.LatLng);
        searchStoreDetail(name);
      }}
    >
      {name}
    </li>
  );
}
