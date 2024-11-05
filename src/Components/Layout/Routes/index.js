import React from "react";
import { Route, Routes } from "react-router-dom";

import Users from "../../Pages/Users";
import Applications from "../../Pages/Applications";
import ApplicationsDetail from "../../Pages/ApplicationsDetail";

const RouteList = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/Applications" element={<Applications />} />
        <Route path="/ApplicationsDetail/:id" element={<ApplicationsDetail />} /> {/* Add the new route */}
      </Routes>
    </>
  );
}

export default RouteList;
