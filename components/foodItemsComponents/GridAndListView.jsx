"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTh, FaList } from "react-icons/fa";
import { setView } from "../../store/slices/getSetFoodItemsSlice";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  gap: 0.5rem; /* space-x-2 */
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop), // Prevent 'active' from being forwarded to the DOM
})`
  padding: 0.5rem; /* p-2 */
  border-radius: 0.25rem; /* rounded */
  background-color: ${({ active, disabled }) =>
    disabled
      ? "#9ca3af"
      : active
      ? "#3b82f6"
      : "#e5e7eb"}; /* bg-gray-400 when disabled */
  color: ${({ active, disabled }) =>
    disabled
      ? "#6b7280"
      : active
      ? "#fff"
      : "#000"}; /* text-gray-500 when disabled */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;
  height: max-content;
  cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"}; /* Prevent clicking when disabled */
`;

const GridListToggle = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.foodItems.view);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Listen to window resize events and set view to 'grid' if width <= 425px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setIsSmallScreen(true);
        dispatch(setView("grid"));
      } else {
        setIsSmallScreen(false);
      }
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Set initial state based on current window size
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <ToggleContainer>
      <ToggleButton
        onClick={() => dispatch(setView("grid"))}
        active={view === "grid"}
      >
        <FaTh />
      </ToggleButton>
      <ToggleButton
        onClick={() => dispatch(setView("list"))}
        active={view === "list"}
        disabled={isSmallScreen} /* Disable button on small screens */
      >
        <FaList />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default GridListToggle;
