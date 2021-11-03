import styled from 'styled-components';
import { map, CustomMarker } from 'hooks/useGoogleMap';
import { Properties } from 'types/model';

interface Props extends Properties {
  markers: CustomMarker[];
  searchStoreDetail: (keyword: string) => void;
}

export default function List({ name, markers, searchStoreDetail }: Props) {
  const handleSearchFocus = () => {
    const selectedMarker = markers.find(({ property }) => property.properties.name === name);

    map!.setCenter(selectedMarker?.marker.getPosition() as google.maps.LatLng);
    searchStoreDetail(name);
  };

  return <Container onClick={handleSearchFocus}>{name}</Container>;
}

const Container = styled.li`
  padding: 15px 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgWhite};
  }
`;
