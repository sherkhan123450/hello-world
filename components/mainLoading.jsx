import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllFoodItems } from "@/app/store/slices/getSetFoodItemsSlice";
import styled, { keyframes } from "styled-components";
import { Button } from "./ButtonComponent";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { fetchPackages } from "@/app/store/slices/packageSlice";
import {
  fetchAllPreviousOrders,
  fetchItemsByNames,
} from "@/app/store/slices/previousOrderSlice";
import { checkAuth } from "../store/slices/authSlice";

const LoadingPage = ({ children }) => {
  const [readySite, setReadySite] = useState(false);
  const [steps, setSteps] = useState(() =>
    typeof window !== "undefined" ? 0 : 0
  );
  const [isMounted, setIsMounted] = useState(false); // Fix for ensuring client-side render
  const dispatch = useDispatch();
  const totalSteps = 4;

  const { isAuthenticated, checkAuthStatus, user } = useSelector(
    (state) => state.auth
  );
  const {
    mostOrderedItems,
    mostOrderedItemsNames,
    previousOrdersStatus,
    mostOrderedItemsStatus,
    previousOrders,
  } = useSelector((state) => state.pOrders);

  const {
    fetchStatus: foodItemsFetchStatus,
    items: foodItems,
    specialOffer,
    weeklyOffers,
  } = useSelector((state) => state.foodItems);

  const { packages, fetchStatus } = useSelector((state) => state.package);

  useEffect(() => {
    setIsMounted(true); // Ensures client-side rendering
    dispatch(checkAuth());
    if (foodItems.length === 0) {
      dispatch(fetchAllFoodItems());
      setSteps((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (packages.length === 0) {
      dispatch(fetchPackages());
    }
  }, [packages]);

  useEffect(() => {
    if (
      foodItemsFetchStatus === "succeeded" &&
      specialOffer &&
      weeklyOffers.length > 0
    ) {
      dispatch(fetchAllPreviousOrders());
      setSteps((prev) => prev + 1);
    }
  }, [foodItemsFetchStatus, specialOffer, weeklyOffers]);

  useEffect(() => {
    if (
      previousOrdersStatus === "succeeded" &&
      mostOrderedItemsNames.length > 2
    ) {
      dispatch(fetchItemsByNames(mostOrderedItemsNames));
    }
  }, [previousOrdersStatus, mostOrderedItemsNames]);

  useEffect(() => {
    if (
      mostOrderedItemsStatus === "succeeded" &&
      mostOrderedItems.length > 0 &&
      previousOrders.length > 0
    ) {
      setSteps((prev) => prev + 1);
      setReadySite(true);
    }
  }, [mostOrderedItemsStatus, mostOrderedItems, previousOrders]);

  if (!isMounted) {
    return null; // Prevents server-rendered content mismatch with client
  }

  return !readySite ? (
    <Container>
      <Title>Gourmet Delights</Title>
      <SubTitle>Preparing your taste experience</SubTitle>
      <ProgressContainer>
        <ProgressBar steps={steps} totalsteps={totalSteps} />
      </ProgressContainer>

      <Spinner />
      <LoadingText>Serving soon...</LoadingText>
    </Container>
  ) : (
    children
  );
};

export default LoadingPage;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ffc107;
  animation: ${keyframes`0%, 100% { opacity: 1; } 50% { opacity: 0.5; }`} 2s
    infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffc107;
  margin-bottom: 1.5rem;
  animation: ${keyframes`0%, 100% { opacity: 1; } 50% { opacity: 0.3; }`} 1.5s
    infinite;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProgressContainer = styled.div`
  width: 20rem;
  height: 0.5rem;
  background: #4b5563;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 15rem;
  }
`;

const ProgressBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !["steps", "totalsteps"].includes(prop),
})`
  width: ${({ steps, totalsteps }) => (steps / totalsteps) * 100}%;
  height: 100%;
  background: #ffc107;
  transition: width 0.3s ease;
`;

const LoadingText = styled.p`
  color: #ffc107;
  animation: ${keyframes`0%, 100% { opacity: 1; } 50% { opacity: 0.5; }`} 1.5s
    infinite;
`;

const Spinner = styled(FaSpinner)`
  font-size: 3rem;
  color: #ffbc40;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;
