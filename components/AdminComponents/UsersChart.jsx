import { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { parseISO, format, startOfMonth, addMonths } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "@/app/store/slices/getUsersSlice";

export default function MarkOptimization() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, users.length]);

  if (!users || users.length === 0) {
    return <div>No users available</div>;
  }

  const userCountsByMonth = {};
  const currentDate = new Date();

  // Get the last 7 months
  for (let i = 0; i < 7; i++) {
    const month = startOfMonth(addMonths(currentDate, -i));
    const monthLabel = format(month, "yyyy-MM");
    userCountsByMonth[monthLabel] = 0; // Initialize the month count
  }

  // Count users by their creation date month
  users.forEach((user) => {
    const createdAt = parseISO(user.createdAt);
    const month = format(startOfMonth(createdAt), "yyyy-MM");
    if (userCountsByMonth[month] !== undefined) {
      userCountsByMonth[month]++;
    }
  });

  // Prepare data for the chart
  // const labels = Object.keys(userCountsByMonth).sort();
  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: "User Registrations",
  //       data: labels.map((label) => userCountsByMonth[label]),
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // };

  const Utils = {
    months: ({ count }) => {
      const labels = [];
      const currentDate = new Date();
      for (let i = 0; i < count; i++) {
        const month = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i
        );
        labels.push(format(month, "yyyy-MM")); // Format to "YYYY-MM"
      }
      return labels.reverse(); // Reverse to have the oldest month first
    },
  };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <LineChart
      xAxis={[{ data: labels, label: "Month" }]}
      series={data.datasets}
      width={600}
      height={400}
    />
  );
}
