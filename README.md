# Welcome to Campuswire Analytics, created by Views From the Six

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

This project, Campuswire Analytics, is a web application that provides analytics on user engagement, trending topics, and user traffic on Campuswire.

## File Structure

/node_modules: Node.js modules
/public: Static files
/server: Backend server file, virtual environment for server, and README for server
/src: React source code
    /components: React components for the web application
    /mock: Mock data for testing
    /models: Data models used in the application
    /pages: React page components for the web application
    /service: Service layer for interacting with the backend
    /viewmodels: View models used in the application
    App.css: Styles for the main App component
    App.test.tsx: Test file for the App component
    App.tsx: Main App component
    index.css: Global styles
    index.tsx: Main entry point
    logo.svg: Logo file
    react-app-env.d.ts: TypeScript declaration file for global types
    reportWebVitals.ts: Web Vitals reporting
    Router.tsx: React Router configuration
    setupTests.tsx: Setup file for Jest tests  
.gitignore: Git ignore file to specify untracked files by Git
package-lock.json: NPM package lock file to lock versions of dependencies installed in the project
package.json: NPM package file to manage/document metadata about the project
README.md: Markdown README file
README.pdf: PDF version of READM
tailwind.config.js: Tailwind CSS configuration
tsconfig.json: TypeScript configuration

## Getting Started

To install all dependencies for the project, you can run:

### `npm install`

To start the application, you can run:

### `npm start`

This command runs our app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Our backend:
By default, our app uses a backend hosted online. You can find server/README.md to learn more about our backend and how to run it locally instead.

# How To Use Our Website

## Trends Page
You can view the trends page by clicking the "Trend" tab on the left.

In the trend page, you notice five selectable topics at the top of the page. These topics are the top 5 most popular topics among the posts and comments in Campuswire. You will also notice a bar graph and a table with three button below it with the following labels: "Posts", "Likes", and "Comments". Finally, below the graph and the buttons is a list of posts. These posts correspond to the currently selected topic.

Clicking one of the trending topics will change the list of posts and the contents of the graph. The graph will show information regarding the currently selected topic. The posts will also be relating to that particular topic. The reason that only the top 5 trending topics are shown is to decrease the risk of information overload but also provide enough information for comparisons. 

Clicking one of the table buttons will change what information the graph is displaying. By default, the graph will show the amount of posts made for the currently selected trending topic over time. However, by clicking a different button, the graph can show likes over time and comments over time. The goal of this information is to help instructors understand when students are engaging with a particular topic. This can help instructors better prepare to meet the needs of students.

While scrolling down the list of posts, you may notice that some of the posts are highlighted black and have exclamation points on them. These indicated "critical posts". A critical post is any post that does not have any replies. The goal of highlighting these critical posts is to bring them to the attention of the instructor and hopefully expedite a response to the student who created the post. 

## Engagement Page
You can view the engagement page by clicking the "Engagement" tab on the left.

In the engagement page, you will find a bar graph and a table. The goal of the page is to inform the users of how the class and specific people have engaged with the campuswire page throughout the semester.

The graph shows user engagement throughout the semester by plotting the number unique users that made and "action" (post, comment, like, ...) for each day in the semester. 

The table below the graph shows the total posts, total comments, and last seen date for every person that has used the campuswire page. The last seen date is the last date that a user made a post or comment. By default, the table shows the data for 10 people at a time. You can flip between pages in the table by clicking the arrows in the bottom right, and you can adjust how many rows are shown at a time using the dropdown in the bottom right.

You can sort the table by name, number of posts, number of comments, or last seen date by clicking the "sort by" button between the graph and the table, and you can choose ascending or descending order by clicking the button to the right which says "Ascending" by default.


## Traffic Page
You can view the traffic page by clicking the "Traffic" tab on the left.

In the traffic page there are several cards. Four cards have statistics that provide information on the traffic that the campuswire page has been receiving. Two cards are charts that show traffic data as well. The goal of the page is to inform the users of different traffic activity that the page has been receiving recently.

The first card shows the current number of unanswered posts, and at the bottom of the card the number of hours since the most recent unanswered post was posted is reported. The second card shows the number of comments made in the past day, and at the bottom of the card is percentage increase or decrease in that number from the previous day. The third card shows the number of posts made in the past day, and at the bottom of the card is percentage increase or decrease in that number from the previous day. The fourth card shows the number of posts resolved in the past day, and at the bottom of the card is percentage increase or decrease in that number from the previous day.

Below the cards showing these statistics there is a card that displays a pie chart. The pie chart reports the number of resolved posts compared to the number of unresolved posts. To the right of this card is another card that displays a line graph. This line graph displays the number of posts made on each day that the campuswire page has been active. 

The cards that show statistics only work when the data being provided is current. When testing, we altered the dates in the mock data provided in order to make sure that these cards worked as planned, but with the original data the statistics don't show because they utilize the current date and time to calculate posts and comments made in the past 24 hours.

# Team Member Names:
Liam Gates
Derek Lacy
Kevin Oliveria
Sam O'Nuallain
Agneshka Rohra
Algis Petlin
Anisha Prahti
Sneha Pullanoor

# GitHub Respository Link:
Link: https://github.com/compsci320/campuswire-stats 