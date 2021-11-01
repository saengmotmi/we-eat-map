import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styled from "styled-components";

import Contents from "components/Contents";

import { useGoogleMap } from "hooks";
import { Welcome } from "types/model";

const Home: NextPage = () => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const {
    properties,
    storeDetail,
    setProperties,
    mapContainerRef,
    searchStoreDetail,
    mapRef,
    markers,
  } = useGoogleMap({ setIsTabOpen });

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
      <GoogleMap isTabOpen={isTabOpen} ref={mapContainerRef} />
      <Contents
        mapRef={mapRef}
        markers={markers}
        properties={properties}
        storeDetail={storeDetail}
        searchStoreDetail={searchStoreDetail}
        isTabOpen={isTabOpen}
        setIsTabOpen={setIsTabOpen}
      />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  height: 100vh;
  overflow: hidden;
`;

const GoogleMap = styled.div<{ isTabOpen: boolean }>`
  height: ${({ isTabOpen }) => (isTabOpen ? "50vh" : "100vh")};
  transition: all 0.5s ease-in-out;
`;
