import Image from "next/image";
import styled from "styled-components";

export const Icon = ({ src }: { src: string }) => {
  return (
    <ImageWrapper>
      <Image alt="icon" width={20} height={20} src={src} />
    </ImageWrapper>
  );
};

export default Icon;

const ImageWrapper = styled.div`
  display: inline-block;
`;
