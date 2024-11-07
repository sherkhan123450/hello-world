"use client";
import styled from "styled-components";

const ProductPageSkeleton = () => {
  return (
    <Container>
      <ProductCard>
        <SkeletonImage />
        <DetailsContainer>
          <SkeletonTitle />
          <SkeletonCategory />
          <SkeletonDescription />
          <SkeletonPrice />
          <SkeletonNetPrice />
          <SkeletonButton />
        </DetailsContainer>
      </ProductCard>
    </Container>
  );
};

export default ProductPageSkeleton;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
`;

const ProductCard = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-direction: row;

  @media (max-width: 425px) {
    display: block;
  }
`;

const SkeletonImage = styled.div`
  height: 400px;
  max-width: 400px;
  margin-right: 20px;
  flex: 1;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400% 100%;
  animation: loading 1.5s infinite;

  @media (max-width: 425px) {
    width: 100%;
    height: 300px;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 425px) {
    margin-top:  20px;
    gap: 0.5rem;
  }
`;

const SkeletonTitle = styled.div`
  height: 30px;
  width: 70%;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SkeletonCategory = styled.div`
  height: 20px;
  width: 50%;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const SkeletonDescription = styled.div`
  height: 20px;
  width: 80%;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const SkeletonPrice = styled.div`
  height: 20px;
  width: 30%;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const SkeletonNetPrice = styled.div`
  height: 30px;
  width: 40%;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const SkeletonButton = styled.div`
  height: 40px;
  width: 40%;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const Error = styled.div`
  font-size: 1.2rem;
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const SkeletonAnimation = styled.div`
  @keyframes loading {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;
