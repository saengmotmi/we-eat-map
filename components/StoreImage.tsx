import Image from "next/image";
import styled from "styled-components";

const StoreImage = ({ src }: { src: string }) => {
  return (
    <ImageContainer>
      <Image layout="fill" src={src ?? "/vercel.svg"} alt="store_image" />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  height: 350px;
  position: relative;
`;

export default StoreImage;
