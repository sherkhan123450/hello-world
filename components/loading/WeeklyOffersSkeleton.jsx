"use client";
import React from "react";
import styled from "styled-components";

const WeeklyOffersSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonHeading>
        <SkeletonTitle />
      </SkeletonHeading>
      <SkeletonItems>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonItem key={index}>
            <SkeletonCard>
              <SkeletonImage />
              <SkeletonOverlay>
                <SkeletonButton>
                  <SkeletonButtonText />
                </SkeletonButton>
              </SkeletonOverlay>
            </SkeletonCard>
          </SkeletonItem>
        ))}
      </SkeletonItems>
    </SkeletonContainer>
  );
};

export default WeeklyOffersSkeleton;

// Styled Components

const SkeletonContainer = styled.div`
  padding: 2rem 0;
  background-color: #f3f4f6; /* Tailwind's gray-100 */
`;

const SkeletonHeading = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SkeletonTitle = styled.div`
  background-color: #d1d5db; /* Tailwind's gray-300 */
  height: 2rem;
  width: 33%;
  margin: 0 auto;
  border-radius: 0.5rem;
`;

const SkeletonItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const SkeletonItem = styled.div`
  width: 100%;
  padding: 1rem;
  display : flex ;

  @media (min-width: 640px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    width: 33.3333%;
  }
`;

const SkeletonCard = styled.div`
  position: relative;
  width: 100%;
  height: 16rem;
  background-color: #d1d5db; /* Tailwind's gray-300 */
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #9ca3af; /* Tailwind's gray-400 */
`;

const SkeletonOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

const SkeletonButton = styled.button`
  background-color: #9ca3af; /* Tailwind's gray-400 */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: not-allowed;
`;

const SkeletonButtonText = styled.div`
  background-color: #6b7280; /* Tailwind's gray-500 */
  height: 1rem;
  width: 6rem;
  border-radius: 0.25rem;
`;
