"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFoodItem } from "@/app/store/slices/getSetFoodItemsSlice";
import { fetchCategories } from "@/app/store/slices/getSetFoodCategorySlice";
import { toast } from "react-toastify";
import styled from "styled-components";

const CreateFoodItem = () => {
  const dispatch = useDispatch();
  const { createStatus, error } = useSelector((state) => state.foodItems);
  const { categories } = useSelector((state) => state.categories);

  const [formdata, setFormdata] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "image" && type === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormdata((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, description, price, image } = formdata;
    if (!name || !category || !description || !price || !image) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await dispatch(
        createFoodItem({ name, category, description, price, image })
      ).unwrap();
      toast.success("Food item created successfully");
    } catch {
      toast.error("Failed to create food item");
    }
  };

  useEffect(() => {
    if (createStatus === "succeeded") {
      setFormdata({
        name: "",
        category: "",
        description: "",
        price: "",
        image: "",
      });
    }
  }, [createStatus]);

  const isCreating = createStatus === "loading";

  return (
    <FormContainer>
      <Title>Create Food Item</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Food Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={formdata.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formdata.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formdata.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image URL or File</Label>
          <Input
            type="text"
            id="image-url"
            name="image"
            placeholder="Paste image URL or upload file below"
            value={formdata.image}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Food Item"}
        </Button>
      </Form>
      {createStatus === "loading" && (
        <StatusMessage>Creating food item...</StatusMessage>
      )}
      {createStatus === "failed" && (
        <StatusMessage error>
          Failed to create food item: {error?.message || "Unknown error"}
        </StatusMessage>
      )}
    </FormContainer>
  );
};

export default CreateFoodItem;

const FormContainer = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const StatusMessage = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "blue")};
  margin-top: 8px;
`;
