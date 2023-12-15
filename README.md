# Welcome to Campuswire Analytics, created by Views From the Six

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

From the project directory, you can run:

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
