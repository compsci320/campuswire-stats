import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrendingPage from "./pages/trending-page/TrendingPage";
import EngagementPage from './pages/engagement-page/EngagementPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrendingPage />}>
        </Route>

        <Route path="/engagement" element={<EngagementPage />}>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
