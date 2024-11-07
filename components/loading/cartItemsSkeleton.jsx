'use client'
import styled, { keyframes } from 'styled-components';

// Animation for the skeleton loading effect
const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Styled component for the skeleton item
const SkeletonItem = styled.div`
  width: 100%;
  height : 500px ;
  height: ${(props) => props.height || '20px'};
  margin-bottom: 10px;
  background-color: #eee;
  background-image: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${loadingAnimation} 1.5s infinite;
  border-radius: 4px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Now, use these in the CartItems component when loading
const CartSkeleton = () => (
  <SkeletonContainer>
    <SkeletonItem height="25px" />
    <SkeletonItem height="25px" />
    <SkeletonItem height="25px" />
    <SkeletonItem height="25px" />
    <SkeletonItem height="25px" />
  </SkeletonContainer>
);

export default CartSkeleton;
