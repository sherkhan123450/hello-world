"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setCategory,
  setSortOrder,
  filterItems,
} from "../../store/slices/getSetFoodItemsSlice";
import styled from "styled-components";
import { fetchCategories } from "@/app/store/slices/getSetFoodCategorySlice";

const Filter = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { searchTerm, category, sortOrder, status } = useSelector(
    (state) => state.foodItems
  );

  useEffect(() => {
      if(categories.length === 0) {
        dispatch(fetchCategories());
      }
  }, [dispatch]);

  const handleFilter = () => {
    dispatch(filterItems());
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading food items.</div>;
  }

  return (
    <FilterContainer>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <Select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </Select>
      <Select
        value={sortOrder}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="a-z">A to Z</option>
        <option value="z-a">Z to A</option>
      </Select>
      <Button onClick={handleFilter}>Apply</Button>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem; /* space-y-4 for mobile */
  align-items: center;
  
  
  @media (max-width: 425px) {
    width : 100% ;
    flex-direction: column;
    align-items: flex-start;
    padding : 1rem 1rem 0 1rem;
    gap : 0.5rem ;  
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;

  @media (max-width: 425px) {
    width : 100% ;
  }

`;

const Select = styled.select`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;

  @media (max-width: 425px) {
    width : 100% ;
  }
`;

const Button = styled.button`
  background-color: #3b82f6; /* bg-blue-500 */
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #2563eb; /* Darker blue on hover */
  }
`;
