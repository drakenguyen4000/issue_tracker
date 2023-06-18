# Issue Tracker (Bug Tracker) - MERN STACK 

### Project Description
- This MERN, single-page issue/bug tracker application allows a company to track issues they find in their company's software or project.  
- This app allows users to report issues/bugs they find, lead engineers to assign users to resolve the issues reported, an assigned user to update the fix status of the issue, and a comment board in each report to allow users to discuss their findings with colleges.  
- The app also includes different permission levels, with administrative users at the top being able to delete comments, reports, and even users. Lead engineers with all rights above except deleting users. 
- These CRUD actions are implemented using REST API routes.
- The app uses React, Node, Express, and MongoDB. Backend implements RESTFUL routes.   

### Main Code
- https://github.com/drakenguyen4000/issue_tracker/blob/master/routes/api/issues.js
- Highlight: The above code handles CRUD operations of issues report.  

### My motivation for this app?  
- I wanted to build an app that is unique compared to what's out there.  I felt like a bug tracker would be a unique and useful project.  
### Why build this project?
- I wanted to build something that most companies could use for their business and that's tracking of projects/products.  Lots of business can use this app to tracks the problems in a product/project and assign employees to fix the issues.  

### What did you learn?
- I learned how to build a full stack app using MERN that uses RESTFUL routes to run CRUD operations.  
- I initially built the components using function and class components.  Then to understand hooks I converted all class component to function components using hook.

### What issues did I run into when building this app?  
#### Storing image file data in a form to post to the server side.
- Solution: Initially I had used methods learned from a prior course using EJS to post data containing an image file to the server side.  This didn't work for a MERN application.  After a lot of research, trial, and error, I was able to implement it.  Instead of storing the file inside an object and posting it, I created used formData to store the data inside a form.  Then I appended the image file to the new form and added encType="multipart/form-data" attribute to the JSX form. This enabled the users to select images to upload for their profile or reports.  

 
### How to Install and Run the Project? 
1. Go to project on Github: https://github.com/drakenguyen4000/issue_tracker
2. You can download the zip file or forking.  
3. You will also need Node and Visual Studio Code installed.  
   - https://code.visualstudio.com/
   - https://nodejs.org/en/
4. Once you have the files, open them in Visual Studio Code, open your terminal, type "npm install".  This will install all packages for the server side.  In terminal, type "cd client" to change directory. Then type "npm install" to install the dependency packages for the client side.  
5. To start app, type cd ../ to go to the root directory.  While in the root directory in the terminal, run "npm run dev".  This will start both client and server of you app.
