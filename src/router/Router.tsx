import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "@src/pages/HomePage";
import UnderwriterPage from "@src/pages/UnderwriterPage";
import StockPage from "@src/pages/StockPage";
import SearchPage from "@src/pages/SearchPage";
import DisclaimerPage from "@src/pages/DisclaimerPage";
import TermsAndConditionsPage from "@src/pages/TermsAndConditions";
import PrivacyPolicyPage from "@src/pages/PrivacyPolicyPage";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/search" element={<SearchPage />} />

      <Route path="/uw/:uwName" element={<UnderwriterPage />} />

      <Route path="/stock/:stockCode" element={<StockPage />} />

      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
};

export default Router;
