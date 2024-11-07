import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "@/app/store/slices/getUsersSlice";

const UsersData = () => {
  const dispatch = useDispatch();
  const { users, status, admins } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: "20px" }}>
      <h2>Users Overview</h2>
      <p>Total Users: {status === "succeeded" ? users.length : "Loading..."}</p>
      <p>Total Admins: {status === "succeeded" ? admins : "Loading..."}</p>
    </div>
  );
};

export default UsersData;
