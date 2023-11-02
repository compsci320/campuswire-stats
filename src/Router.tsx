import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import TrendingPage from "./pages/trending-page/TrendingPage";
import TrafficPage from './pages/traffic-page/TrafficPage';
import EngagementPage from './pages/engagement-page/EngagementPage';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <TrendingPage />
  },
  {
    path: "/traffic",
    element: <TrafficPage />
  },
  {
    path: "/engagement",
    element: <EngagementPage />
  }
]);

export default Router;
