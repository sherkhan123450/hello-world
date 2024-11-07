import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoodItems,
  updateItem,
  setSearchTerm,
  setCategory,
  filterItems,
  deleteFoodItem,
} from "@/app/store/slices/getSetFoodItemsSlice";
import { fetchCategories } from "@/app/store/slices/getSetFoodCategorySlice";
import styled from "styled-components";

export default function OfferPage() {
  const dispatch = useDispatch();
  const {
    items: foodItems,
    filteredItems,
    fetchStatus,
    error,
    searchTerm,
    category,
  } = useSelector((state) => state.foodItems);
  const { categories } = useSelector((state) => state.categories);

  const [showOfferInputs, setShowOfferInputs] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    isSpecialOffer: false,
    ifWeeklyOffer: false,
    discountPercentage: 0,
    net_price: 0,
  });
  const [currentOfferId, setCurrentOfferId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllFoodItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterItems());
  }, [dispatch, searchTerm, category, foodItems, activeFilter]);

  const handleCreateOffer = (e) => {
    e.preventDefault();
    const { discountPercentage, price } = formData;
    const netPrice = price - (price * discountPercentage) / 100;
    const updatedFormData = { ...formData, net_price: netPrice };

    if (currentOfferId) {
      dispatch(updateItem({ id: currentOfferId, data: updatedFormData }));
    }

    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      isSpecialOffer: false,
      ifWeeklyOffer: false,
      discountPercentage: 0,
      net_price: 0,
    });
    setShowOfferInputs(false);
  };

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
  };

  const handleDelete = (id) => {
    dispatch(deleteFoodItem(id));
  };

  const filteredAndPagedItems = filteredItems.filter((item) => {
    if (activeFilter === "weekly") return item.ifWeeklyOffer;
    if (activeFilter === "special") return item.isSpecialOffer;
    return true;
  });

  return (
    <PageContainer>
      <Title>Food Offers</Title>
      <StyledButton onClick={() => dispatch(fetchAllFoodItems())}>
        Refresh
      </StyledButton>
      <FilterWrapper>
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <StyledSelect value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </StyledSelect>
        <StyledButton onClick={() => handleFilterClick("all")}>
          All
        </StyledButton>
        <StyledButton onClick={() => handleFilterClick("weekly")}>
          Weekly Offers
        </StyledButton>
        <StyledButton onClick={() => handleFilterClick("special")}>
          Special Offers
        </StyledButton>
      </FilterWrapper>

      <StyledCardContainer>
        {fetchStatus === "loading" && <p>Loading...</p>}
        {fetchStatus === "failed" && <p>Error: {error}</p>}
        {fetchStatus === "succeeded" &&
          filteredAndPagedItems.map((item) => (
            <StyledCard key={item._id}>
              <CardContent>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
                <CardText>Category: {item.category}</CardText>
                <CardText>Price: ${item.price}</CardText>
                <CardText>Discount: {item.discountPercentage || 0}%</CardText>
                <CardText>Net Price: ${item.net_price || 0}</CardText>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <StyledButton onClick={() => handleDelete(item._id)}>
                    Delete
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      setShowOfferInputs(true);
                      setCurrentOfferId(item._id);
                      setFormData(item);
                    }}
                  >
                    Edit
                  </StyledButton>
                </div>
              </CardContent>
            </StyledCard>
          ))}
      </StyledCardContainer>

      {showOfferInputs && (
        <DialogOverlay show={showOfferInputs}>
          <Dialog>
            <DialogTitle>
              {currentOfferId ? "Edit Food Item" : "Create Food Item"}
            </DialogTitle>
            <DialogForm onSubmit={handleCreateOffer}>
              <Input
                name="name"
                placeholder="Enter item name..."
                value={formData.name}
                onChange={handleOnChange}
              />
              <Input
                name="description"
                placeholder="Enter description..."
                value={formData.description}
                onChange={handleOnChange}
              />
              <Input
                name="price"
                type="number"
                placeholder="Enter price..."
                value={formData.price}
                onChange={handleOnChange}
              />
              <Input
                name="discountPercentage"
                type="number"
                placeholder="Enter discount percentage..."
                value={formData.discountPercentage}
                onChange={handleOnChange}
              />
              <StyledSelect
                name="category"
                value={formData.category}
                onChange={handleOnChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </StyledSelect>
              <StyledSelect
                name="isSpecialOffer"
                value={formData.isSpecialOffer}
                onChange={handleOnChange}
              >
                <option value={true}>Special Offer</option>
                <option value={false}>Not a Special Offer</option>
              </StyledSelect>
              <StyledSelect
                name="ifWeeklyOffer"
                value={formData.ifWeeklyOffer}
                onChange={handleOnChange}
              >
                <option value={true}>Weekly Offer</option>
                <option value={false}>Not a Weekly Offer</option>
              </StyledSelect>
              <DialogActions>
                <StyledButton onClick={() => setShowOfferInputs(false)}>
                  Cancel
                </StyledButton>
                <StyledButton type="submit" primary>
                  Save
                </StyledButton>
              </DialogActions>
            </DialogForm>
          </Dialog>
        </DialogOverlay>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 16px;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledSelect = styled.select`
  padding: 12px;
  width: 100%;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  ${(props) =>
    props.primary
      ? "background-color: #007bff; color: white;"
      : "background-color: white; color: #007bff; border: 1px solid #007bff;"}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  }
`;

const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const StyledCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  background: #fff;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const DialogTitle = styled.h3`
  margin-top: 0;
`;

const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 8px;
`;
