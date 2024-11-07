"use client";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import React, { useEffect } from "react";
import MostLikedItemsSkeleton from "../loading/MostLikedItemsSkeleton";
import { Button } from "@/app/components/ButtonComponent";
import { fetchItemsByNames } from "@/app/store/slices/previousOrderSlice";
import Link from "next/link";
import styled from "styled-components";

const MostLikedItems = () => {
  const dispatch = useDispatch();

  const {
    mostOrderedItems: mostLikedItems,
    mostOrderedItemsStatus: status,
    previousOrdersStatus,
    mostOrderedItemsNames,
    mostOrderedItemsError,
  } = useSelector((state) => state.pOrders);

  useEffect(() => {
    if (
      (previousOrdersStatus === "succeeded" &&
        mostOrderedItemsNames?.length &&
        mostLikedItems.length === 0) ||
      mostOrderedItemsError
    ) {
      dispatch(fetchItemsByNames(mostOrderedItemsNames));
    }
  }, [
    dispatch,
    previousOrdersStatus,
    mostOrderedItemsNames,
    mostOrderedItemsError,
  ]);

  if (status === "loading" || status === "idle")
    return <MostLikedItemsSkeleton />;
  if (status === "failed") return <p>Error loading special offer</p>;

  return (
    <Wrapper>
      <hr />
      <Header>
        <Title>Most Liked</Title>
        <Link href="/foodItems" passHref>
          <StyledButton>
            <span>→</span> See All
          </StyledButton>
        </Link>
      </Header>
      <ItemsContainer>
        {mostLikedItems.length > 0 ? (
          mostLikedItems.map((item) => (
            <Card
              key={item._id}
              price={item.price}
              name={item.name}
              image={item.image}
              id={item._id}
              category={item.category}
              description={item.description}
              netPrice={item.net_price}
              discountAmount={item.discountPercentage}
            />
          ))
        ) : (
          <p>No most liked items available.</p>
        )}
      </ItemsContainer>
    </Wrapper>
  );
};

export default MostLikedItems;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
  @media (min-width: 1440px) {
    width: 80vw;
    margin: 0 auto;
  }
  @media (max-width: 639px) {
    padding: 0.75rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffbc40;

  @media (min-width: 640px) {
    font-size: 1.875rem; /* sm:text-3xl */
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem; /* lg:text-4xl */
  }

  @media (max-width: 639px) {
    font-size: 1.5rem; /* smaller text for smaller screens */
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
  }

  @media (max-width: 639px) {
    font-size: 0.875rem; /* smaller button text */
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (max-width: 640px) {
    gap: 1.5rem; /* sm:gap-6 */
    flex-direction: column;
  }

  @media (min-width: 1024px) {
    gap: 2rem; /* lg:gap-8 */
  }

  @media (max-width: 639px) {
    gap: 0.5rem; /* smaller gap for smaller screens */
  }
`;
