"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoodItems,
  setSearchTerm,
  setCategory,
  filterItems,
} from "@/app/store/slices/getSetFoodItemsSlice";
import { fetchCategories } from "@/app/store/slices/getSetFoodCategorySlice";
import { toast } from "react-toastify";
import { createPackage } from "@/app/store/slices/packageSlice";
import styled from "styled-components";

const CreatePackage = () => {
  const dispatch = useDispatch();
  const {
    items: foodItems,
    searchTerm,
    category,
    sortOrder,
  } = useSelector((state) => state.foodItems);
  const { categories } = useSelector((state) => state.categories);
  const { createStatus } = useSelector((state) => state.package);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPackagePopup, setShowPackagePopup] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    packageImage: "",
  });

  useEffect(() => {
    dispatch(filterItems());
  }, [dispatch, searchTerm, category, sortOrder, foodItems]);

  useEffect(() => {
    dispatch(fetchAllFoodItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleItemSelection = (item) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some(
        (selectedItem) => selectedItem._id === item._id
      );
      return isSelected
        ? prev.filter((selectedItem) => selectedItem._id !== item._id)
        : [...prev, { ...item, editablePrice: item.price }];
    });
  };

  const handleSearchChange = (e) => dispatch(setSearchTerm(e.target.value));
  const handleCategoryChange = (e) => dispatch(setCategory(e.target.value));
  const handleRefresh = () => dispatch(fetchAllFoodItems());

  const openPackagePopup = () => {
    if (selectedItems.length < 2) {
      toast.error("Please select at least two items");
      return;
    }
    setShowPackagePopup(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormdata((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePriceChange = (itemId, newPrice) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, editablePrice: newPrice } : item
      )
    );
  };

  const calculateTotalPrice = () =>
    selectedItems.reduce(
      (total, item) => total + parseFloat(item.editablePrice),
      0
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, packageImage } = formdata;
    if (!name || !description || !packageImage || selectedItems.length < 2) {
      toast.error("Please fill in all fields and select at least two items");
      return;
    }

    const items = selectedItems.map((item) => ({
      name: item.name,
      price: parseFloat(item.editablePrice),
    }));
    const totalPrice = calculateTotalPrice();

    try {
      await dispatch(
        createPackage({
          items,
          name,
          description,
          totalPrice,
          image: packageImage,
        })
      ).unwrap();
      toast.success("Package created successfully");
      setShowPackagePopup(false);
      setSelectedItems([]);
      setFormdata({ name: "", description: "", packageImage: "" });
    } catch (error) {
      toast.error("Failed to create package");
    }
  };

  return (
    <CreatePackageWrapper>
      <Title>Create Food Package</Title>
      <FormWrapper>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Select value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Select>
        <Button onClick={handleRefresh}>Refresh</Button>
      </FormWrapper>

      <FoodItemsGrid>
        {foodItems.map((item) => (
          <Card key={item._id}>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={selectedItems.some(
                  (selected) => selected._id === item._id
                )}
                onChange={() => handleItemSelection(item)}
              />
            </CheckboxContainer>
            <CardHeader>{item.name}</CardHeader>
            <CardDescription>{item.description}</CardDescription>
            <CardPrice>${item.price}</CardPrice>
          </Card>
        ))}
      </FoodItemsGrid>

      <Button onClick={openPackagePopup} disabled={selectedItems.length < 2}>
        {createStatus === "loading" ? "Creating..." : "Create Package"}
      </Button>

      {showPackagePopup && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Package Details</ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Package Name"
                value={formdata.name}
                onChange={handleFormChange}
                required
              />
              <div>
                {selectedItems.map((item) => (
                  <div key={item._id}>
                    <span>{item.name}</span>
                    <Input
                      type="number"
                      value={item.editablePrice}
                      onChange={(e) =>
                        handlePriceChange(item._id, e.target.value)
                      }
                      style={{ width: "80px" }}
                    />
                  </div>
                ))}
              </div>
              <Input
                type="file"
                name="packageImage"
                onChange={handleFormChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formdata.description}
                onChange={handleFormChange}
                required
              />
              <TotalPrice>
                Total Price: ${calculateTotalPrice().toFixed(2)}
              </TotalPrice>
              <Button type="submit">Save Package</Button>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </CreatePackageWrapper>
  );
};

export default CreatePackage;

// Styled components for the package creation UI
const CreatePackageWrapper = styled.div`
  padding: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0056b3")};
  }
`;

const FoodItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; // Allow positioning of the checkbox
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 10px; // Adjust for positioning
  right: 10px; // Adjust for positioning
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CardHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const CardPrice = styled.span`
  font-size: 1rem;
  color: #007bff;
  font-weight: bold;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TotalPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
`;
