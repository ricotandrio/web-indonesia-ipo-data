import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "@src/pages/HomePage";
import UnderwriterPage from "@src/pages/UnderwriterPage";
import StockPage from "@src/pages/StockPage";

const Router: React.FC = () => {

  return (
    <Routes>
        <Route path="/" element={<HomePage />} /> 

        <Route path="/uw/:uwName" element={<UnderwriterPage />} />

        <Route path="/stock/:stockCode" element={<StockPage />} />
    </Routes>
  );
};

export default Router;