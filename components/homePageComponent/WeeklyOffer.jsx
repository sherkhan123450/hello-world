"use client";
import { useSelector } from "react-redux";
import React from "react";
import WeeklyOffersSkeleton from "../loading/WeeklyOffersSkeleton"; // Import the Skeleton Loader
import Card from "../Card"; // Import the Card component
import styled from "styled-components"; // Import styled-components

const WeeklyOffers = () => {
  const weeklyOffers = useSelector((state) => state.foodItems.weeklyOffers);
  const status = useSelector((state) => state.foodItems.fetchStatus);

  // Show loading skeleton while fetching data
  if (status === "loading" || status === "idle")
    return <WeeklyOffersSkeleton />;

  // Show error message if fetching failed
  if (status === "failed")
    return <ErrorMessage>Error loading special offer</ErrorMessage>;

  return (
    <Container>
      <ContentWrapper>
        {/* Left Side Text */}
        <TextSection>
          <Title>Weekly Offers</Title>
          <Description>
            Discover our exclusive weekly offers and special discounts on your
            favorite products. Don't miss out on these limited-time deals!
            Explore now and enjoy the savings.
          </Description>
        </TextSection>
        {/* Right Side Cards */}
        <CardSection>
          <CardGrid>
            {weeklyOffers.length > 0 ? (
              weeklyOffers.map((offer) => (
                <CardWrapper key={offer._id}>
                  <Card
                    name={offer.name}
                    image={offer.image}
                    price={offer.price}
                    netPrice={offer.net_price}
                    discountAmount={offer.discountPercentage}
                    description={offer.description}
                    id={offer._id}
                    category={offer.category}
                  />
                </CardWrapper>
              ))
            ) : (
              <NoOffersMessage>No weekly offers available.</NoOffersMessage>
            )}
          </CardGrid>
        </CardSection>
      </ContentWrapper>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 2rem 0;
  background-color: #f7fafc; /* Gray 100 */
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* Use for responsiveness */
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
    /* Change to row on larger screens */
  }
`;

const TextSection = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    width: 33.33%; /* lg:w-1/3 */
  }
`;

const Title = styled.h2`
  font-size: 2rem; /* Equivalent to text-3xl */
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #4a5568; /* Gray 700 */
  margin-bottom: 1rem;
`;

const CardSection = styled.div`
  width: 100%;
  padding: 1rem;

  @media (min-width: 1024px) {
    width: 66.67%; /* lg:w-2/3 */
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr)); /* Default: 2 columns */

  @media (max-width: 640px) {
    grid-template-columns: 1fr; /* 1 column for small screens */
  }
  @media (min-width: 641px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
  }
  @media (min-width: 1025px) {
    grid-template-columns: repeat(
      2,
      minmax(200px, 1fr)
    ); /* 2 columns for larger screens */
  }
`;

const CardWrapper = styled.div`
  padding: 1rem; /* p-4 */
`;

const NoOffersMessage = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: #e53e3e; /* Text red-500 */
  text-align: center;
`;

export default WeeklyOffers;
