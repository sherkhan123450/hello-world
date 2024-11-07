import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoodItems,
  updateItem,
  setSearchTerm,
  setCategory,
  filterItems,
  setSortOrder,
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
    sortOrder,
  } = useSelector((state) => state.foodItems);
  const { categories } = useSelector((state) => state.categories);

  const [showOfferInputs, setShowOfferInputs] = useState(false);
  const [formData, setFormData] = useState({
    isSpecialOffer: false,
    ifWeeklyOffer: false,
    discountPercentage: "",
    net_price: 0,
  });
  const [currentOfferId, setCurrentOfferId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAllFoodItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterItems());
  }, [dispatch, searchTerm, category, sortOrder, foodItems]);

  const handleCreateOffer = (e) => {
    e.preventDefault();
    const { discountPercentage, isSpecialOffer, ifWeeklyOffer } = formData;
    const currentOffer = foodItems.find((item) => item._id === currentOfferId);

    if (!currentOffer) {
      console.error("Offer not found");
      return;
    }

    const originalPrice = parseFloat(currentOffer.price) || 0;
    const discountAmount =
      (originalPrice * parseFloat(discountPercentage || 0)) / 100;
    const netPrice = originalPrice - discountAmount;

    const updatedFormData = {
      isSpecialOffer,
      ifWeeklyOffer,
      discountPercentage: parseFloat(discountPercentage) || 0,
      net_price: netPrice,
    };

    if (currentOfferId) {
      dispatch(updateItem({ id: currentOfferId, data: updatedFormData }));
    }

    setFormData({
      isSpecialOffer: false,
      ifWeeklyOffer: false,
      discountPercentage: "",
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
    const selectedCategory = e.target.value;
    console.log("Selected category:", selectedCategory); // Log to check
    dispatch(setCategory(selectedCategory));
  };

  const handleSortChange = (property) => {
    const isAsc = sortOrder === property && sortOrder === "asc";
    dispatch(setSortOrder(isAsc ? "desc" : "asc"));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    dispatch(fetchAllFoodItems());
  };

  return (
    <Container>
      <Header>Food Offers</Header>
      <FlexBox>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Select onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </Select>

        <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
      </FlexBox>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader onClick={() => handleSortChange("name")}>
              Name
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("price")}>
              Price
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("category")}>
              Category
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("discountPercentage")}>
              Discount (%)
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("net_price")}>
              Net Price
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("isSpecialOffer")}>
              Special Offer
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("ifWeeklyOffer")}>
              Weekly Offer
            </TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {fetchStatus === "succeeded" &&
            filteredItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.discountPercentage || 0}%</TableCell>
                  <TableCell>${item.net_price || 0}</TableCell>
                  <TableCell>{item.isSpecialOffer ? "Yes" : "No"}</TableCell>
                  <TableCell>{item.ifWeeklyOffer ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <RefreshButton
                      onClick={() => {
                        setShowOfferInputs(true);
                        setCurrentOfferId(item._id);
                        setFormData({
                          isSpecialOffer: item.isSpecialOffer || false,
                          ifWeeklyOffer: item.ifWeeklyOffer || false,
                          discountPercentage: item.discountPercentage || "",
                          net_price: item.net_price || 0,
                        });
                      }}
                    >
                      {currentOfferId === item._id
                        ? "Edit Offer"
                        : "Create Offer"}
                    </RefreshButton>
                  </TableCell>
                </TableRow>
              ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <div>
          <PaginationButton
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => handleChangePage(null, page + 1)}
            disabled={page >= Math.ceil(filteredItems.length / rowsPerPage) - 1}
          >
            Next
          </PaginationButton>
        </div>
        <div>
          Rows per page:
          <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
            {[5, 10, 25].map((rows) => (
              <option key={rows} value={rows}>
                {rows}
              </option>
            ))}
          </Select>
        </div>
      </PaginationContainer>

      {/* Edit Offer Dialog */}
      {showOfferInputs && (
        <DialogOverlay>
          <DialogContent>
            <DialogTitle>
              {currentOfferId ? "Edit Offer" : "Create Offer"}
            </DialogTitle>
            <DialogForm onSubmit={handleCreateOffer}>
              <FormGroup>
                <CheckboxInput
                  type="checkbox"
                  name="isSpecialOffer"
                  checked={formData.isSpecialOffer}
                  onChange={handleOnChange}
                />
                Special Offer
              </FormGroup>
              <FormGroup>
                <CheckboxInput
                  type="checkbox"
                  name="ifWeeklyOffer"
                  checked={formData.ifWeeklyOffer}
                  onChange={handleOnChange}
                />
                Weekly Offer
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="discountPercentage"
                  onChange={handleOnChange}
                  value={formData.discountPercentage}
                  placeholder="Discount (%)"
                />
              </FormGroup>
              <SubmitButton type="submit">
                {currentOfferId ? "Update" : "Create"}
              </SubmitButton>
              <RefreshButton
                type="button"
                onClick={() => setShowOfferInputs(false)}
              >
                Cancel
              </RefreshButton>
            </DialogForm>
          </DialogContent>
        </DialogOverlay>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.div`
  padding: 16px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;

const RefreshButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const DialogTitle = styled.h2`
  margin-bottom: 16px;
`;

const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    background-color: #0056b3;
  }
`;
