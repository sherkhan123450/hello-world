"use client";
import React from "react";
import Dashboard from "./Dashboard";
import Users from "./Users";
import CurrentOrders from "./currentOrders";
import PreviousOrders from "./PrivousOrders";
import CreateCategory from "./CreatCategory";
import CreateFoodItem from "./CreateFoodItems";
import CreateOffer from "./CreateOfferAndEditFoodItem";
import CreatePackage from "./CreatePackeg";
import ManagePackage from "./ManagePackage";
import Container from "../ContainerWithScrollbar";
import Reservations from "./ReservationsDetails";

const AdminContent = ({ page }) => {
  let Content;

  switch (page) {
    case "dashboard":
      Content = <Dashboard />;
      break;
    case "users":
      Content = <Users />;
      break;
    case "orders/current":
      Content = <CurrentOrders />;
      break;
    case "orders/previous":
      Content = <PreviousOrders />;
      break;
    case "menu/create-category":
      Content = <CreateCategory />;
      break;
    case "menu/create-food-item":
      Content = <CreateFoodItem />;
      break;
    case "menu/create-offer":
      Content = <CreateOffer />;
      break;
    case "menu/create-package":
      Content = <CreatePackage />;
      break;
    case "menu/manage-package":
      Content = <ManagePackage />;
      break;
    case "menu/reservations":
      Content = <Reservations />;
      break;
    default:
      Content = <Dashboard />;
  }

  return <Container>{Content}</Container>;
};

export default AdminContent;
