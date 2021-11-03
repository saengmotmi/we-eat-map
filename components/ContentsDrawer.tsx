import { useRef } from 'react';
import styled from 'styled-components';
import List from 'components/List';
import { useOnClickOutside, useDrawer, useStoreDetail, CustomMarker } from 'hooks';
import { useGoogleMapSearch } from 'hooks/useGoogleMap';
import StoreDetail from './StoreDetail';

interface Props {
  markers: CustomMarker[];
}

const ContentsDrawer = ({ markers }: Props) => {
  const contentsDrawerRef = useRef<HTMLDivElement>(null);
  const { storeDetail } = useStoreDetail();
  const { searchStoreDetail } = useGoogleMapSearch();
  const { isDrawerOpen, handleDrawerOpen } = useDrawer();

  useOnClickOutside(contentsDrawerRef, handleClickOutSide);

  function handleClickOutSide(e: React.MouseEvent<HTMLElement>) {
    const nodeList = document.querySelectorAll("div[role='button']");
    const isMarkerClicked = [...nodeList].some(node => node.contains(e.target as Node));

    if (!isMarkerClicked) handleDrawerOpen(false);
  }

  const storeImgURL = storeDetail.photos?.[0].getUrl();

  return (
    <Container ref={contentsDrawerRef}>
      <Tab onClick={() => handleDrawerOpen(!isDrawerOpen)} />
      <StoreList>
        {markers.map(({ property: prop }, idx) => (
          <List
            key={prop.properties.name + idx}
            {...prop.properties}
            {...prop.geometry}
            searchStoreDetail={searchStoreDetail}
            markers={markers}
          />
        ))}
      </StoreList>
      <StoreDetail storeDetail={storeDetail} storeImgURL={storeImgURL} />
    </Container>
  );
};

export default ContentsDrawer;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  display: flex;
  background: white;
`;

const Tab = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 50px;
  background-color: black;
  z-index: 100;
`;

const StoreList = styled.ul`
  flex: 1;
  overflow-y: auto;
`;
