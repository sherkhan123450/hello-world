"use client";
import React from "react";
import ReservationBooking from "@/app/components/reservationComponents/reservationBooking";
import styled from "styled-components";
import Aside from "@/app/components/orderedComponents/Aside";

const Page = () => {
  return (
    <Wrapper>
      <ReservationBooking />
      <Aside />
    </Wrapper>
  );
};

export default Page;

const Wrapper = styled.div`
  width: 96vw;
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  gap: 2vw;
`;
