import React from 'react';
import './EngagementPage.css';
import Navbar from '../../components/navbar/navbar';
import { createViewModel } from '../../service/EngagementService';
import {Post} from "../../models/Post";
import StickyHeadTable from '../../components/engagetable/engagetable';
import Column from '../../components/engagetable/engagetable';
import Data from '../../components/engagetable/engagetable';


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

function createData(name: string, totalPosts: number, lastSeen: Date): Data {
  return { name, totalPosts, lastSeen };
}

const rows = nameArray.map((name, index) => createData(name, numPostsArray[index], lastSeenArray[index]));

const engagetable = StickyHeadTable(columns, rows);



function EngagementPage() {
  return (
    <>
        <Navbar />
        <engagetable />
    </>
  );
}

export default EngagementPage;