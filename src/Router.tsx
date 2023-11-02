import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrendingPage from "./pages/trending-page/TrendingPage";
import EngagementPage from './pages/engagement-page/engagement-page';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EngagementPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
