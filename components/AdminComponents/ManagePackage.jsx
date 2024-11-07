import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackages,
  deletePackage,
  editPackage,
} from "@/app/store/slices/packageSlice";
import { toast } from "react-toastify";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardContent = styled.div`
  margin-bottom: 0.5rem;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #333;
`;

const CardFooter = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  color: #007bff;
  margin-top: 0.5rem;
`;

const Description = styled.p`
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: #fff;

  ${({ variant }) =>
    variant === "delete"
      ? `background-color: #e74c3c;
         &:hover { background-color: #c0392b; }`
      : `background-color: #3498db;
         &:hover { background-color: #2980b9; }`}
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: #fff;
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#7f8c8d" : "#27ae60"};
  &:hover {
    background-color: ${({ variant }) =>
      variant === "cancel" ? "#95a5a6" : "#2ecc71"};
  }
`;

const PackageList = () => {
  const dispatch = useDispatch();
  const { packages, fetchStatus, error } = useSelector(
    (state) => state.package
  );

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editedPackageData, setEditedPackageData] = useState({
    name: "",
    totalPrice: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePackage(id))
      .unwrap()
      .then(() => toast.success("Package deleted successfully"))
      .catch(() => toast.error("Failed to delete package"));
  };

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setEditedPackageData({
      name: pkg.name,
      totalPrice: pkg.totalPrice,
      description: pkg.description,
    });
    setIsEditPopupOpen(true);
  };

  const handleSave = () => {
    if (selectedPackage) {
      const updatedData = {
        ...editedPackageData,
      };
      dispatch(editPackage({ id: selectedPackage._id, updatedData }))
        .unwrap()
        .then(() => {
          toast.success("Package updated successfully");
          setIsEditPopupOpen(false);
        })
        .catch(() => toast.error("Failed to update package"));
    }
    dispatch(fetchPackages());
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
    setSelectedPackage(null);
  };

  return (
    <Container>
      <Title>Package List</Title>
      {fetchStatus === "loading" && <p>Loading...</p>}
      {fetchStatus === "failed" && <p>{error}</p>}
      {fetchStatus === "succeeded" && packages.length === 0 && (
        <p>No packages found</p>
      )}

      {fetchStatus === "succeeded" && packages.length > 0 && (
        <Grid>
          {packages.map((pkg) => (
            <Card key={pkg._id}>
              <CardTitle>{pkg.name}</CardTitle>
              <CardContent>
                <strong>Items:</strong>
                {pkg.items.map((item) => (
                  <ItemRow key={item._id}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                  </ItemRow>
                ))}
              </CardContent>
              <CardFooter>Total Price: ${pkg.totalPrice}</CardFooter>
              <Description>{pkg.description}</Description>
              <ButtonGroup>
                <Button variant="delete" onClick={() => handleDelete(pkg._id)}>
                  Delete
                </Button>
                <Button variant="edit" onClick={() => handleEdit(pkg)}>
                  Edit
                </Button>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>
      )}

      {isEditPopupOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Edit Package</ModalTitle>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={editedPackageData.name}
                onChange={(e) =>
                  setEditedPackageData({
                    ...editedPackageData,
                    name: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                value={editedPackageData.totalPrice}
                onChange={(e) =>
                  setEditedPackageData({
                    ...editedPackageData,
                    totalPrice: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Textarea
                value={editedPackageData.description}
                onChange={(e) =>
                  setEditedPackageData({
                    ...editedPackageData,
                    description: e.target.value,
                  })
                }
              />
            </FormGroup>
            <ModalButtonGroup>
              <ModalButton variant="save" onClick={handleSave}>
                Save
              </ModalButton>
              <ModalButton variant="cancel" onClick={handleCancel}>
                Cancel
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PackageList;
