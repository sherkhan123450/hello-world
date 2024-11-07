import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllFoodItems } from '@/app/store/slices/getSetFoodItemsSlice'; 
import {fetchPackages} from '@/app/store/slices/packageSlice';

// Assuming this is the correct slice

const FoodItemsData = () => {
  const dispatch = useDispatch();
  const { items, fetchStatus } = useSelector((state) => state.foodItems);
  const { packages , fetchStatus : pStatus } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(fetchAllFoodItems());
    dispatch(fetchPackages());
  }, [dispatch]);

  if (fetchStatus === 'loading' && pStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Food Items Overview</h2>
      <p>Total Food Items: {items.length}</p>
      <p>Total Food Items: {packages.length}</p>
    </div>
  );
};

export default FoodItemsData;
