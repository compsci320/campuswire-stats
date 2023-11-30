import React from 'react';
import './EngagementPage.css';
import { createViewModel, getUniqueUserCountByDate, createEngagementChartData } from '../../service/EngagementService';
import {Post} from "../../models/Post";
import { Engagetable, Column, Data } from '../../components/engagetable/engagetable';
import { EngagementGraph } from "../../components/engagementGraph/engagementGraph"
import EngagementBar from '../../components/engagementbar/engagementbar';
import { basename } from 'path/posix';

// Stuff for sort buttons
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



let post_data: Post[] = require('../../mock/mock.json');
const viewModel = createViewModel(post_data);

let nameArray: string[] = [];
let numPostsArray: string[] = [];
let numCommentsArray: string[] = [];
let lastSeenArray: string[] = [];

viewModel.nameMap.forEach((value, key) => {
  nameArray.push(value[0] + " " + value[1]);
  viewModel.numPostsMap.has(key) ? numPostsArray.push(viewModel.numPostsMap.get(key)!.toString()) : numPostsArray.push("0");
  viewModel.numCommentsMap.has(key) ? numCommentsArray.push(viewModel.numCommentsMap.get(key)!.toString()) : numCommentsArray.push("0");
  viewModel.lastSeenMap.has(key) ? lastSeenArray.push(viewModel.lastSeenMap.get(key)!.toDateString()) : lastSeenArray.push("0");
});


// ADD MORE FIELDS TO TABLE AND GET THE DATA
const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'numPosts', label: 'Number of Posts', minWidth: 100 },
  { id: 'numComments', label: 'Number of Comments', minWidth: 100},
  { id: 'lastSeen', label: 'Last Seen', minWidth: 100 },
];

function createData(name: string, numPosts: string, numComments: string, lastSeen: string): Data {
  return { name, numPosts, numComments, lastSeen};
}

const rows = nameArray.map((name, index) => createData(name, numPostsArray[index], numCommentsArray[index], lastSeenArray[index]));


function compare_columns(option: string, isString: boolean, ascending: boolean)  {
  // Type is either "string" or "number"
  return (a: any, b: any) => {
    a = a[option];
    b = b[option];
    console.log("A:", a);
    console.log("B:", b);
    
    if (isString) {
      return ascending ? a.localeCompare(b) : -a.localeCompare(b);
    } else {
      
      if (a === undefined) {
        a = 0;
      } else {
        a = ascending ? parseFloat(a) : -parseFloat(a);
      }

      if (b === undefined) {
        b = 0;
      } else {
        b = ascending ? parseFloat(b) : -parseFloat(b);
      }

      return a < b ? -1 : 1;
    }
  }
}           

function EngagementPage() {
  const chartData = createEngagementChartData(post_data);
  const [sortOption, setSortOption] = React.useState("");
  const [sortAscending, setSortAscending] = React.useState(true);

  if (sortOption.length > 0) {
    // Assumes that name and lastSeen are strings, need to change this if more string fields are added to the rows
    rows.sort(compare_columns(sortOption, sortOption === "name" || sortOption === "lastSeen", sortAscending));
  }
    
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
          {/* Sort button stuff */}
          <button onClick={() => setSortOption("name")}>Sort by Name</button>
          <button onClick={() => setSortOption("numPosts")}>Sort by Number of Posts</button>
          <button onClick={() => setSortAscending(!sortAscending)}>{sortAscending ? "Descend" : "Ascend"}</button>
          
          {/* Table stuff */}
          <Engagetable columns={columns} rows={rows} />
        </div>
    </>
  );
  }


export default EngagementPage;