import { useRef } from "react";
import styled from "styled-components";

import List from "components/List";
import Icon from "components/Icon";
import StoreImage from "components/StoreImage";

import { useOnClickOutside, useDrawer, CustomMarker } from "hooks";
import { isFullObject } from "utils";

interface Props {
  storeDetail: google.maps.places.PlaceResult;
  searchStoreDetail: (keyword: string) => void;
  markers: CustomMarker[];
}

const ContentsDrawer = ({ storeDetail, searchStoreDetail, markers }: Props) => {
  const ref = useRef();
  const { isDrawerOpen, handleDrawerOpen } = useDrawer();

  const handleClickOutSide = (e: any) => {
    const nodeList = document.querySelectorAll("div[role='button']");
    const isMarkerClicked = [...nodeList].some((node) =>
      node.contains(e.target)
    );

    if (!isMarkerClicked) handleDrawerOpen(false);
  };

  useOnClickOutside(ref, handleClickOutSide);

  const storeImgURL = storeDetail.photos?.[0].getUrl();

  return (
    <Container ref={ref}>
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
      {isFullObject(storeDetail) && (
        <StoreDetail>
          <div>
            <StoreTitle>{storeDetail.name}</StoreTitle>
            <Icon src={storeDetail.icon!} />
            <OpeningHour>
              {storeDetail.opening_hours?.isOpen() ? "영업 중" : "영업 종료"}
            </OpeningHour>
          </div>
          <p>
            {storeDetail.rating} / 5점 ({storeDetail.user_ratings_total}명 평가)
          </p>
          <p>위치: {storeDetail.formatted_address}</p>
          {storeImgURL && <StoreImage src={storeImgURL} />}
        </StoreDetail>
      )}
    </Container>
  );
};

export default ContentsDrawer;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
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

const StoreTitle = styled.h1`
  display: inline-block;
`;

const StoreList = styled.ul`
  flex: 1;
  overflow-y: auto;
`;

const StoreDetail = styled.div`
  flex: 3;

  img {
    object-fit: cover;
  }
`;

const OpeningHour = styled.span``;
