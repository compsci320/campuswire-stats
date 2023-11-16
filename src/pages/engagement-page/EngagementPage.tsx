import React from 'react';
import './EngagementPage.css';
import { createViewModel, getUniqueUserCountByDate, createEngagementChartData } from '../../service/EngagementService';
import {Post} from "../../models/Post";
import { Engagetable, Column, Data } from '../../components/engagetable/engagetable';
import { EngagementGraph } from "../../components/engagementGraph/engagementGraph"
import EngagementBar from '../../components/engagementbar/engagementbar';



let post_data: Post[] = require('../../mock/mock.json');
const viewModel = createViewModel(post_data);

let totalPosts = viewModel.totalPosts;
let totalComments = viewModel.totalComments;

let nameArray: string[] = [];
viewModel.nameMap.forEach((value, key) => nameArray.push(value[0] + " " + value[1]));

let numPostsArray: string[] = [];
viewModel.numPostsMap.forEach((value, key) => numPostsArray.push(value.toString()));

let shareOfPostsArray: string[] = [];
viewModel.numPostsMap.forEach((value, key) => shareOfPostsArray.push((value / totalPosts).toFixed(2)));

let numCommentsArray: string[] = [];
viewModel.numCommentsMap.forEach((value, key) => numCommentsArray.push(value.toString()));

let shareOfCommentsArray: string[] = [];
viewModel.numCommentsMap.forEach((value, key) => shareOfCommentsArray.push((value / totalComments).toFixed(2)));

let lastSeenArray: string[] = [];
viewModel.lastSeenMap.forEach((value, key) => lastSeenArray.push(value.toString()));


// ADD MORE FIELDS TO TABLE AND GET THE DATA
const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'numPosts', label: 'Number of Posts', minWidth: 100 },
  { id: 'shareOfPosts', label: 'Share of Posts', minWidth: 100 },
  { id: 'numComments', label: 'Number of Comments', minWidth: 100},
  { id: 'shareOfComments', label: 'Share of Comments', minWidth: 100 },
  { id: 'lastSeen', label: 'Last Seen', minWidth: 100 },
];

function createData(name: string, numPosts: string, shareOfPosts: string, numComments: string, shareOfComments: string, lastSeen: string): Data {
  return { name, numPosts, shareOfPosts, numComments, shareOfComments, lastSeen};
}

const rows = nameArray.map((name, index) => createData(name, numPostsArray[index], shareOfCommentsArray[index],
                                                          numCommentsArray[index], shareOfPostsArray[index], lastSeenArray[index]));


function EngagementPage() {
  const chartData = createEngagementChartData(post_data);
    
  return (
    <>
        <div>
          <EngagementBar />
          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}>
            <EngagementGraph engagement_data={chartData.y} x_title={"Dates"} x_axis={chartData.x}/>
          </div>
          <Engagetable columns={columns} rows={rows} />
        </div>
    </>
  );
  }


export default EngagementPage;