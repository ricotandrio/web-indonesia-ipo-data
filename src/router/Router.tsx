import React from "react";
import { Route, Routes } from "react-router-dom";


const Router: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<>
        <h1></h1>
      </>} />
    </Routes>
  );
};

export default Router;