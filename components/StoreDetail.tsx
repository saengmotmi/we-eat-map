import styled from 'styled-components';

import Icon from 'components/Icon';
import StoreImage from 'components/StoreImage';

import { isFullObject } from 'utils';
import RatingStar from './RatingStar';

interface Props {
  storeDetail: google.maps.places.PlaceResult;
  storeImgURL: string | undefined;
}

export default function StoreDetail({ storeDetail, storeImgURL }: Props) {
  return (
    <Container>
      {isFullObject(storeDetail) ? (
        <>
          {storeImgURL && <StoreImage src={storeImgURL} />}
          <TitleContainer>
            <StoreTitle>{storeDetail.name}</StoreTitle>
            <Icon src={storeDetail.icon!} />
            {/* <OpeningHour>{storeDetail.opening_hours?.isOpen() ? '영업 중' : '영업 준비 중'}</OpeningHour> */}
          </TitleContainer>
          <Rating>
            {storeDetail.rating && <RatingStar rating={storeDetail.rating} />}
            {storeDetail.rating} / 5점 ({storeDetail.user_ratings_total}명 평가)
          </Rating>
          <Place>위치: {storeDetail.formatted_address}</Place>
        </>
      ) : (
        <div>선택된 장소가 없습니다</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 10px;
  flex: 3;

  img {
    object-fit: cover;
  }
`;

const TitleContainer = styled.div`
  margin: 10px 0;
`;

const StoreTitle = styled.h1`
  display: inline-block;
  margin-right: 10px;
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.aestheticBlack};
`;

const OpeningHour = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const Rating = styled.p`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.aestheticBlack};
`;

const Place = styled.p`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.aestheticBlack};
`;
