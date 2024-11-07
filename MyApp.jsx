"use client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store"; // Adjust the import path as needed
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingWrapper from "@/app/components/mainLoading";
import { useSelector } from "react-redux";

const ReduxProviderWrapper = ({ children }) => {
  const [shouldRenderNavbarAndFooter, setShouldRenderNavbarAndFooter] =
    useState(true);
  const [shouldRenderFooter, setShouldRenderFooter] = useState(true);
  const [shouldRenderNavbar, setShouldRenderNavbar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const noNavAndFooterRoutes = [
      "/authentication/registration",
      "/authentication/login",
      "/authentication/set-password",
      "/authentication/forgetpassword",
    ];
    const noFooterRoutes = [
      "/profile",
      "/admin",
      "/orderedItems",
      "/authentication/forgetpassword",
      "/authentication/set-password",
      "/authentication/login",
    ];
    const noNavRoutes = ["/admin"];

    setShouldRenderNavbarAndFooter(!noNavAndFooterRoutes.includes(pathname));
    setShouldRenderFooter(!noFooterRoutes.includes(pathname));
    setShouldRenderNavbar(!noNavRoutes.includes(pathname));
  }, [pathname]);

  return (
    <ReduxProvider store={store}>
      <ToastContainer />
      <LoadingWrapper>
        {shouldRenderNavbarAndFooter && shouldRenderNavbar && <Navbar />}
        <main >
          {children}
        </main>
        {shouldRenderNavbarAndFooter && shouldRenderFooter && <Footer />}
      </LoadingWrapper>
    </ReduxProvider>
  );
};

export default ReduxProviderWrapper;
