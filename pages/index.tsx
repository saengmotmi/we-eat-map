import type { NextPage } from 'next';
import styled from 'styled-components';
import ContentsDrawer from 'components/ContentsDrawer';
import { useGoogleMap, useDrawer } from 'hooks';

const Home: NextPage = () => {
  const { isDrawerOpen } = useDrawer();
  const { searchStoreDetail, markers } = useGoogleMap();

  return (
    <Container>
      <GoogleMap id="map" isDrawerOpen={isDrawerOpen} />
      <ContentsDrawer markers={markers} searchStoreDetail={searchStoreDetail} />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  height: 100vh;
  overflow: hidden;
`;

const GoogleMap = styled.div<{ isDrawerOpen: boolean }>`
  height: ${({ isDrawerOpen }) => (isDrawerOpen ? '30vh' : '100vh')};
  transition: all 0.5s ease-in-out;
`;
