import React from 'react';
import './EngagementPage.css';
import Navbar from '../../components/navbar/navbar';
import { createViewModel } from '../../service/EngagementService';
import {Post} from "../../models/Post";
import { Engagetable, Column, Data } from '../../components/engagetable/engagetable';
import { EngagementGraph } from "../../components/engagementGraph/engagementGraph"



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
  return (
    <>
        <Navbar />
        <EngagementGraph engagement_data={[2, 5, 3, 4, 1, 3, 8, 9]} x_title={"Years"} x_axis={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]}/>
        <Engagetable columns={columns} rows={rows} />
    </>
  );
  }


export default EngagementPage;