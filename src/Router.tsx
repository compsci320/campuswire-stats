import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from './components/main-layout/MainLayout';
import TrendingPage from "./pages/trending-page/TrendingPage";
import TrafficPage from './pages/traffic-page/TrafficPage';
import EngagementPage from './pages/engagement-page/EngagementPage';
// Creates router to navigate between different pages of the web app
const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/trends" />
      },
      {
        path: "/trends",
        element: <TrendingPage />
      },
      {
        path: "/traffic",
        element: <TrafficPage />
      },
      {
        path: "/engagement",
        element: <EngagementPage />
      },
      {
        path: "*",
        element: <Navigate to="/error" />
      }
    ]
  },
  {
    path: "/error",
    element: <h1>ERROR: INVALID PATH</h1>
  }
]);

export default Router;