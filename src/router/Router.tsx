import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "@src/pages/HomePage";
import UnderwriterPage from "@src/pages/UnderwriterPage";
import StockPage from "@src/pages/StockPage";
import SearchPage from "@src/pages/SearchPage";
import Error500 from "@src/pages/Error500";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/search" element={<SearchPage />} />

      <Route path="/uw/:uwName" element={<UnderwriterPage />} />

      <Route path="/stock/:stockCode" element={<StockPage />} />

      <Route path="/error/500" element={<Error500 />} />
    </Routes>
  );
};

export default Router;
