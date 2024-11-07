"use client";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, getOrders } from "../../store/slices/orderSlice";
import { setTotalItemsPrice } from "../../store/slices/cartSlice";
import styled from "styled-components";
import { Button } from "../ButtonComponent";
import { io } from "socket.io-client";

const DELIVERY_FEE = 50.0; // Delivery fee constant
const FREE_DELIVERY_THRESHOLD = 5000; // Free delivery threshold

const CartBill = () => {
  const socket = io();

  const dispatch = useDispatch();

  const { items, totalItemsPrice } = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.user?.userId);
  const { addOrderStatus } = useSelector((state) => state.orders);
  const { profile } = useSelector((state) => state.profile);

  // Calculate total items price whenever items change
  useEffect(() => {
    const calculatedPrice = items.reduce((total, item) => {
      return total + (item.net_price || 0) * (item.quantity || 0);
    }, 0);
    dispatch(setTotalItemsPrice(calculatedPrice));
  }, [items, dispatch]);

  // Memoize order object
  const order = useMemo(
    () => ({
      userId,
      items,
      totalPrice: totalItemsPrice,
    }),
    [userId, items, totalItemsPrice]
  );

  const handleOrder = () => {
    if (order && profile) {
      dispatch(addOrder({ order, profile }));
      socket.emit("updateCurrentOrderPage");

    }
  };

  const isDeliveryFree = totalItemsPrice >= FREE_DELIVERY_THRESHOLD;
  const progressValue = Math.min(totalItemsPrice, FREE_DELIVERY_THRESHOLD);

  return (
    <CartBillContainer>
      <PaymentProcess>
        Cash Payment Only <span className="span"></span>
      </PaymentProcess>
      <hr />
      <ItemsLength>Items: {items.length}</ItemsLength>
      <ShippingAddress>Shipping Address: {profile.address}</ShippingAddress>

      <PriceInfo>
        <p>Delivery Fee: Rs {DELIVERY_FEE}.00 per/K</p>
        <p>Total Price: ${totalItemsPrice.toFixed(2)}</p>
      </PriceInfo>

      <ProgressContainer>
        <ProgressLabel isDeliveryFree={isDeliveryFree}>
          {isDeliveryFree
            ? "Delivery Free!"
            : `Spend $${(FREE_DELIVERY_THRESHOLD - totalItemsPrice).toFixed(
              2
            )} more for free delivery`}
        </ProgressLabel>
        <ProgressBarContainer>
          <ProgressBar value={progressValue} max={FREE_DELIVERY_THRESHOLD} />
        </ProgressBarContainer>
      </ProgressContainer>

      <div>
        {addOrderStatus === "loading" ? (
          <OrderStatusText>Order submitting...</OrderStatusText>
        ) : (
          <Button
            onClick={handleOrder}
            disabled={!items.length || addOrderStatus === "loading"}
          >
            Place Order
          </Button>
        )}
      </div>
    </CartBillContainer>
  );
};

export default CartBill;

// Styled components

const CartBillContainer = styled.div`
  justify-self: flex-end;
  margin-top: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  gap: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #ffbc40;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ffbc40;
  }
`;

const PaymentProcess = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PriceInfo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;

  p {
    margin-bottom: 0.5rem;
  }
`;

const OrderStatusText = styled.p`
  font-size: 1rem;
  color: #ff9900;
  font-style: italic;
`;

const ItemsLength = styled.div`
  font-size: 1rem;
  color: #555;
`;

const ShippingAddress = styled.div`
  font-size: 1rem;
  color: #555;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProgressLabel = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isDeliveryFree"].includes(prop), // Prevent specific props from being forwarded
})`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.isDeliveryFree ? "#28a745" : "#ffbc40")};
  margin-bottom: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ffbc40;
  border-radius: 0px 10px 10px 0;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 100%;
  border-radius: 0px 10px 10px 0;
  background-color: #ffbc40;

  &::-webkit-progress-value {
    background-color: #ffbc40;
    border-radius: 0px 10px 10px 0;
  }
`;
