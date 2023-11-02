import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrendingPage from "./pages/trending-page/TrendingPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrendingPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
