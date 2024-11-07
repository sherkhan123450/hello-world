import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchAllCurrentOrders } from "@/app/store/slices/currentOrderSlice";
import { useDispatch, useSelector } from "react-redux";

const CurrentOrdersData = () => {
  const dispatch = useDispatch();
  const { currentOrdersStatus, activeCurrentOrders, pendingCurrentOrders } =
    useSelector((state) => state.cOrders);

  useEffect(() => {
    dispatch(fetchAllCurrentOrders());
  }, [dispatch]);

  return (
    <>
      {currentOrdersStatus === "succeeded" && (
        <>
          <Card>
            <CardTitle>Active Orders</CardTitle>
            <CardValue>{activeCurrentOrders.length}</CardValue>
          </Card>

          <Card>
            <CardTitle>Pending Orders</CardTitle>
            <CardValue isPending>{pendingCurrentOrders.length}</CardValue>
          </Card>

          {currentOrdersStatus === "loading" && (
            <LoadingText>Loading orders...</LoadingText>
          )}

          {currentOrdersStatus === "failed" && (
            <ErrorText>Failed to load orders.</ErrorText>
          )}
        </>
      )}
    </>
  );
};

export default CurrentOrdersData;

const Card = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => (props.color === "blue" ? "#2563eb" : "#10b981")};
`;
