"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserReservations,
  cencleReservation,
} from "@/app/store/slices/reservationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/app/components/ButtonComponent";
import Link from "next/link";

const ReservationList = () => {
  const {
    reservations: allReservations,
    getUserReservationsStatus,
    error,
  } = useSelector((state) => state.reservation);
  const [reservations, setReservations] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userId = user?.userId;

  useEffect(() => {
    if (userId) {
      dispatch(getUserReservations(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const activeReservations = allReservations.filter(
      (reservation) => !reservation.isCanceled
    );
    setReservations(activeReservations);
  }, [allReservations]);

  const handleCancel = (reservationId) => {
    if (userId && reservationId) {
      dispatch(cencleReservation({ userId, reservationId }));
    }
  };

  if (!user || !isAuthenticated) {
    return (
      <Container>
        <StyledLink href="/authentication/login">
          Registration or login required
        </StyledLink>
      </Container>
    );
  }

  if (getUserReservationsStatus === "loading") {
    return (
      <Container>
        <Title>Your Reservations</Title>
        <SkeletonList>
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </SkeletonList>
      </Container>
    );
  }

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Title>Your Reservations</Title>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <ReservationCard key={reservation._id}>
            <CardTitle>{reservation.partyType}</CardTitle>
            <CardDetail>
              <strong>Name:</strong> {reservation.fullName}{" "}
              {reservation.isCanceled ? "(Canceled)" : ""}
            </CardDetail>
            <CardDetail>
              <strong>Email:</strong> {reservation.email}
            </CardDetail>
            <CardDetail>
              <strong>Phone:</strong> {reservation.phone}
            </CardDetail>
            <CardDetail>
              <strong>Table:</strong> {reservation.table}
            </CardDetail>
            <CardDetail>
              <strong>Party Date:</strong>{" "}
              {new Date(reservation.partyDate).toLocaleDateString()}
            </CardDetail>
            <CardDetail>
              <strong>Party Time:</strong> {reservation.partyTime}
            </CardDetail>
            <CardDetail>
              <strong>Selected Package:</strong> {reservation.selectedPackages}
            </CardDetail>
            <CardDetail>
              <strong>Food Packages:</strong>
              {reservation.foodPackages?.join(", ") || "None"}
            </CardDetail>
            <Button onClick={() => handleCancel(reservation._id)}>
              Cancel Reservation
            </Button>
          </ReservationCard>
        ))
      ) : (
        <ErrorMessage>No reservations found.</ErrorMessage>
      )}
    </Container>
  );
};

export default ReservationList;

// Styled Components
const Container = styled.div`
  width: 70vw;
  margin: 20px auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  @media (max-width: 425px) {
    padding: 0;
    width: 100vw;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

const ReservationCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
`;

const CardDetail = styled.p`
  color: #4b5563;
  margin: 0.25rem 0;
`;

const StyledLink = styled(Link)`
  color: #0000ee;
  text-decoration: underline;
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkeletonCard = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  height: 120px;
  animation: pulse 1.5s infinite ease-in-out;
  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #d3d3d3;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;
