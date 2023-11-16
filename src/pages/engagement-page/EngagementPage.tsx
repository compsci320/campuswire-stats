import React from 'react';
import './EngagementPage.css';
import { createViewModel, getUniqueUserCountByDate, createEngagementChartData } from '../../service/EngagementService';
import {Post} from "../../models/Post";
import { Engagetable, Column, Data } from '../../components/engagetable/engagetable';
import { EngagementGraph } from "../../components/engagementGraph/engagementGraph"
import EngagementBar from '../../components/engagementbar/engagementbar';



let post_data: Post[] = require('../../mock/mock.json');
const viewModel = createViewModel(post_data);

let nameArray: string[] = [];
viewModel.nameMap.forEach((value, key) => nameArray.push(value[0] + " " + value[1]));

let numPostsArray: string[] = [];
viewModel.numPostsMap.forEach((value, key) => numPostsArray.push(value.toString()));

let lastSeenArray: string[] = [];
viewModel.lastSeenMap.forEach((value, key) => lastSeenArray.push(value.toString()));


// ADD MORE FIELDS TO TABLE AND GET THE DATA
const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'numPosts', label: 'Number of Posts', minWidth: 100 },
  { id: 'lastSeen', label: 'Last Seen', minWidth: 100 },
];

function createData(name: string, numPosts: string, lastSeen: string): Data {
  return { name, numPosts, lastSeen };
}

const rows = nameArray.map((name, index) => createData(name, numPostsArray[index], lastSeenArray[index]));


function EngagementPage() {
  const chartData = createEngagementChartData(post_data);
    
  return (
    <>
        <div>
          <EngagementBar />
          <EngagementGraph engagement_data={chartData.y} x_title={"Dates"} x_axis={chartData.x}/>
          <Engagetable columns={columns} rows={rows} />
        </div>
    </>
  );
  }


export default EngagementPage;