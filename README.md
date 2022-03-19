# Issue Tracker (Bug Tracker) - MERN STACK 

### Project Description
- This issue/bug tracker application allows a company to create reports to track issues they find in their company's software or project.  
- This app allows users to report issues/bugs they find, lead engineers to assign users to resolve the issues reported, an assigned user to update the fix status of the issue, and a comment board in each report to allow users to discuss their findings with colleges.  
- The app uses React, Node, Express, and MongoDB. Backend implements RESTFUL routes.  
### My motivation for this app?  
- I wanted to build an app that is unique compared to what's out there.  I felt like a bug tracker would be a unique and useful project.  
### Why build this project?
- I wanted to build something that most companies could use for their business and that's tracking of projects/products.  Lots of business can use this app to tracks the problems in a product/project and assign employees to fix the issues.  

### What did you learn?
- I learned how to build a full stack app using MERN that uses RESTFUL routes to run CRUD operations.  
- I initially built the components using function and class components.  Then to understand hooks I converted all class component to function components using hook.

### What issues did I run into when building this app?  
#### Storing and posting image file data to post to the server side to upload into Cloudinary service.  
- Solution: Initially I had used methods learned from a prior course using EJS to post data containing an image file to the server side.  This didn't work for a MERN application.  After a lot of research, trial, and error, I was able to implement it.  Instead of storing the file inside an object and posting it, I created used formData to store the data inside a form.  Then I appended the image file to the new form and added encType="multipart/form-data" attribute to the JSX form. This enabled the users to select images to upload for their profile or reports.  

 
### How to Install and Run the Project? 
1. Go to project on Github: https://github.com/drakenguyen4000/issue_tracker
2. You can download the zip file or forking.  
3. You will also need Node and Visual Studio Code installed.  
   - https://code.visualstudio.com/
   - https://nodejs.org/en/
4. Once you have the files, open them in Visual Studio Code, open your terminal, type "npm install".  This will install all node packages necessary to run this app.  
5. To start app, while in the root directory in the terminal, run "npm run dev".  This will start both client and server of you app.