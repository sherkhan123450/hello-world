"use client";
import React from "react";
import OrderedItems from "@/app/components/orderedComponents/OrderedItems";
import styled from "styled-components";
import Aside from "@/app/components/orderedComponents/Aside";

const Page = () => {
  return (
    <Wrapper>
      <OrderedItems className="orderedItems" />
      <Aside className="aside" />
    </Wrapper>
  );
};

export default Page;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 98%;
  margin: auto;

  .orderedItems {
    flex: 1;
    margin-right: 2%;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .orderedItems {
    }

    .aside {
    }
  }
`;
