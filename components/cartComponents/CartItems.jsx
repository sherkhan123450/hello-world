"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantityLocally,
  fetchCartItems,
} from "@/app/store/slices/cartSlice";
import styled from "styled-components";
import { MdOutlineDeleteForever, MdAdd, MdRemove } from "react-icons/md";
import CartItemsSkeleton from "@/app/components/loading/CartItemsSkeleton";
import Link from "next/link";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const CartItems = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: cartItems, fetchStatus } = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});
  const userId = user?.userId;
  const { addOrderStatus } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user && user.userId) {
      if (cartItems.length === 0 || fetchStatus === "failed") {
        dispatch(fetchCartItems(user.userId));
      }
    }
  }, [user, dispatch, cartItems]);

  useEffect(() => {
    if (cartItems.length) {
      const initialQuantities = cartItems.reduce((acc, item) => {
        acc[item._id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    if (user && user.userId) {
      dispatch(removeItem({ userId: user.userId, itemId }));
    }
  };

  const handleUpdateQuantity = (itemId, change) => {
    const currentQuantity = quantities[itemId] || 1;
    const newQuantity = currentQuantity + change;

    if (newQuantity >= 1) {
      setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
      dispatch(updateQuantityLocally({ itemId, newQuantity }));
    }
  };

  const calculateNetPrice = (item) => {
    const quantity = quantities[item._id] || 1;
    return (item.net_price * quantity).toFixed(2);
  };

  if (!user || !isAuthenticated) {
    return (
      <CartContainer>
        <Link href="/authentication/login" style={{ color: "#0000EE" }}>
          Registration or login required
        </Link>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      {fetchStatus === "loading" ||
        (fetchStatus === "idle" && <CartItemsSkeleton />)}
      <CartTable>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Net Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={uuidv4()}>
              <td>
                <img
                  className="cart-image"
                  src={item.image && item.image}
                  alt={item.name || "Item Image"}
                  width={60}
                  height={60}
                />
              </td>
              <td>{item.name || "N/A"}</td>
              <td>${item.net_price}</td>
              <td>
                <ButtonGroup className="quantity-buttons">
                  <IconButton
                    onClick={() => handleUpdateQuantity(item._id, -1)}
                    disabled={quantities[item._id] === 1}
                    className="buttons"
                  >
                    <MdRemove className="button" />
                  </IconButton>
                  <QuantityInput
                    className="quantity-input"
                    type="number"
                    value={quantities[item._id] || 1}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        item._id,
                        Number(e.target.value) - quantities[item._id]
                      )
                    }
                  />
                  <IconButton
                    className="buttons"
                    onClick={() => handleUpdateQuantity(item._id, 1)}
                  >
                    <MdAdd className="button" />
                  </IconButton>
                </ButtonGroup>
              </td>
              <td>${calculateNetPrice(item)}</td>
              <td>
                <RemoveButton onClick={() => handleRemoveItem(item._id)}>
                  <MdOutlineDeleteForever />
                </RemoveButton>
              </td>
            </tr>
          ))}
        </tbody>
      </CartTable>
      <StyledLink href="/foodItems">
        <FaAngleDoubleLeft />
        Go to Menu
      </StyledLink>
    </CartContainer>
  );
};

export default CartItems;

const CartContainer = styled.div`
  flex: 2;
  padding: 1rem;
  min-width: 66vw;

  .cart-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    .cart-image {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 375px) {
    padding: 0.25rem;
    .cart-image {
      width: 50px;
      height: 50px;
    }
  }
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: white;

  th,
  td {
    padding: 12px;
    text-align: center;
  }

  th {
    font-weight: 600;
    color: #666;
  }

  tbody tr {
    border-bottom: 1px solid #f0f0f0;
    &:hover {
      background-color: #f9f9f9;
    }
  }

  tbody td {
    border: none;
  }
  td:last-child {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 425px) {
    th,
    td {
      padding: 4px;
      text-align: center;
      font-size: 0.55rem;

      .cart-image {
        width: 40px;
        height: 40px;
      }

      .quantity-buttons {
        .quantity-input {
          width: 20px;
          padding: 2px;
        }
        .buttons {
          margin: 0;
          padding: 3px;
          .button {
            font-size: 0.9rem;
          }
        }
      }
    }

    th {
      font-weight: 600;
      color: #666;
    }

    tbody tr {
      border-bottom: 1px solid #f0f0f0;
      &:hover {
        background-color: #f9f9f9;
      }
    }

    tbody td {
      border: none;
    }
    td:last-child {
      height: 40px;
    }
  }

  @media (max-width: 375px) {
    th,
    td {
      padding: 4px;
      text-align: center;
      font-size: 0.55rem;

      .cart-image {
        width: 40px;
        height: 40px;
      }

      .quantity-buttons {
        .quantity-input {
          width: 20px;
          padding: 2px;
        }
        .buttons {
          margin: 0;
          padding: 3px;
          .button {
            font-size: 0.9rem;
          }
        }
      }
    }

    th {
      font-weight: 600;
      color: #666;
    }

    tbody tr {
      border-bottom: 1px solid #f0f0f0;
      &:hover {
        background-color: #f9f9f9;
      }
    }

    tbody td {
      border: none;
    }
    td:last-child {
      height: 40px;
    }
  }
  @media (max-width: 320px) {
    th,
    td {
      padding: 1px;
      text-align: center;
      font-size: 0.45rem;

      .cart-image {
        width: 30px;
        height: 30px;
      }

      .quantity-buttons {
        .quantity-input {
          width: 20px;
          padding: 2px;
        }
        .buttons {
          margin: 0;
          padding: 3px;
          .button {
            font-size: 0.9rem;
          }
        }
      }
    }

    th {
      font-weight: 600;
      color: #666;
    }

    tbody tr {
      border-bottom: 1px solid #f0f0f0;
      &:hover {
        background-color: #f9f9f9;
      }
    }

    tbody td {
      border: none;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  font-size: 1.25rem;
  margin: 0 4px;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  @media (max-width: 375px) {
    font-size: 0.6rem;
    padding: 4px;
  }

  @media (max-width: 320px) {
    font-size: 0.5rem;
    padding: 2px;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 6px;
  border-radius: 4px;
  margin: 0 8px;

  @media (max-width: 375px) {
    width: 40px;
    padding: 4px;
  }

  @media (max-width: 320px) {
    width: 35px;
    padding: 2px;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e63946;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #d62828;
  }

  @media (max-width: 375px) {
    font-size: 1rem;
  }

  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: #ffbc40;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: underline;

  &:hover {
    color: #2980b9;
  }

  @media (max-width: 375px) {
    font-size: 0.6rem;
  }

  @media (max-width: 320px) {
    font-size: 0.5rem;
  }
`;
