  import React from "react";
  import { Outlet, useLocation } from "react-router-dom";
  import Header from "../components/Header/Header";
  import Sidebar from "../components/Sidebar/Sidebar";

  const MainLayout = () => {
    const location = useLocation();
    const url = ["/login"];
    const shouldHidePage = url.includes(location.pathname);
    return (
      <div>
        {shouldHidePage ? null : <Header />}
        <main className="container mx-auto flex ">
          {shouldHidePage ? null : <Sidebar />}
          <div className="w-full mx-auto pl-5">
            <Outlet />
          </div>
        </main>
      </div>
    );
  };

  export default MainLayout;
