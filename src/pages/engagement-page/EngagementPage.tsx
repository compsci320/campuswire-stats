import React from 'react';
import './EngagementPage.css';
import Navbar from '../../components/navbar/navbar';
import Engagetable from '../../components/engagetable/engagetable';
import { EngagementGraph } from "../../components/engagementGraph/engagementGraph"

function EngagementPage() {
  return (
    <>
        <Navbar />
        <EngagementGraph engagement_data={[2, 5, 3, 4, 1, 3, 8, 9]} x_title={"Years"} x_axis={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]}/>
        <Engagetable />
    </>
  );
}

export default EngagementPage;