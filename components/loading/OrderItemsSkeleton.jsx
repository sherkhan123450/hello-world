import styled from "styled-components";

const SkeletonTable = () => (
  <Wrapper>
    <OrdersTable>
      <thead>
        <TableRow className="header">
          <TableHeader>Total Price</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Items</TableHeader>
          <TableHeader>Time</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {Array(8)
          .fill("")
          .map((_, idx) => (
            <SkeletonRow key={idx}>
              <SkeletonData />
              <SkeletonData />
              <SkeletonData />
              <SkeletonData />
              <SkeletonData />
            </SkeletonRow>
          ))}
      </tbody>
    </OrdersTable>
  </Wrapper>
);

export default SkeletonTable;

// Styled components for the skeleton effect
const SkeletonRow = styled.tr``;

const Wrapper = styled.div`
  width: 70vw;
  height: 600px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 65vw;
  }
  @media (max-width: 768px) {
    width: 98vw;
    margin: 0 auto;
  }
  .status {
    color: #ffbc40;
  }
  .createdAt span {
    display: block;

    @media (max-width: 1024px) {
      font-size: 0.8rem;
    }
  }
`;

const SkeletonData = styled.td`
  background-color: #e0e0e0;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -150%;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    from {
      left: -150%;
    }
    to {
      left: 150%;
    }
  }
`;

// Styled components for the table structure
const OrdersTable = styled.table`
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  width : 100% ;
  height: 100%;

  @media (max-width: 768px) {
    width: 92vw;
  }
`;

const TableRow = styled.tr`
  &.header {
    background-color: #ff7043;
    color: white;
  }
  &:hover {
    background-color: #fce4ec;
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: white;
  border-bottom: 1px solid #ddd;
`;
