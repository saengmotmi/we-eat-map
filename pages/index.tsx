import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "styled-components";

import ContentsDrawer from "components/ContentsDrawer";

import { useGoogleMap, useDrawer } from "hooks";
import { Welcome } from "types/model";

const Home: NextPage = () => {
  const {
    properties,
    storeDetail,
    setProperties,
    mapContainerRef,
    searchStoreDetail,
    mapRef,
    markers,
  } = useGoogleMap();
  const { isDrawerOpen } = useDrawer();

  useEffect(() => {
    (async () => {
      const res: Welcome = await fetch("/api/markers").then((res) =>
        res.json()
      );

      setProperties(res.features);
    })();
  }, []);

  return (
    <Container>
      <GoogleMap isDrawerOpen={isDrawerOpen} ref={mapContainerRef} />
      <ContentsDrawer
        mapRef={mapRef}
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
