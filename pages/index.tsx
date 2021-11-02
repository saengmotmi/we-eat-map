import type { NextPage } from "next";
import styled from "styled-components";

import ContentsDrawer from "components/ContentsDrawer";

import { useGoogleMap, useDrawer, useProperties } from "hooks";

const Home: NextPage = () => {
  const { isDrawerOpen } = useDrawer();
  const { storeDetail, searchStoreDetail, markers, setMarkers } =
    useGoogleMap();
  const { properties } = useProperties({
    setMarkers,
    searchStoreDetail,
  });

  return (
    <Container>
      <GoogleMap id="map" isDrawerOpen={isDrawerOpen} />
      <ContentsDrawer
        markers={markers}
        properties={properties}
        storeDetail={storeDetail}
        searchStoreDetail={searchStoreDetail}
      />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  height: 100vh;
  overflow: hidden;
`;

const GoogleMap = styled.div<{ isDrawerOpen: boolean }>`
  height: ${({ isDrawerOpen }) => (isDrawerOpen ? "50vh" : "100vh")};
  transition: all 0.5s ease-in-out;
`;
