This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

WELCOME TO EMPADA

This app was created in 2 short weeks utilizing REACT.js, EXPRESS.js, CHARTKICK.js, REACT-S-ALERT.js, SEQUELIZE.js, POSTGRES, PASSPORT, MAILGUN and MATERIALIZE.

The team consisted of 4 memeber, AMMAR MASUD, BRANDON BOOTH, BERNARDO SIQEIRA and WILL CHOU as part of a final project during a web bootcamp at Lighthouse Labs. 

Empada is an event management dashboard designed to keep an event planner or manager up to date on the progress of all of their contractors tasks
all on one screen. It has a sleek design that negates the need for managers to constantly switch between tabs while working on a single project. 

Features include:
  - real time updates for all app features
  - a task dashboard featuring:
    - progress bars
    - a live timeline
    - a real time newsfeed
  - event creation page where you can add new contractors and assign them tasks for the day
  - a dynamically rendered timeline that is created as tasks are assigned to contractors
  - a taskdashboard that shows the event manager all of the tasks they have assigned as well as whether or not they have begun or ended
  - an email is sent out to all contractors with their list of tasks for the day
  - a store listing all of the created projects, both past and present

Setup Instructions

1. git clone the following repos:

  Runs the front-end for app 
  https://github.com/bernardofcs/empada   - the one you are currently

  Runs the server for for both repos
  https://github.com/bernardofcs/empada-tasklist

  Runs the front-end for the taskdashboard sent through email
  https://github.com/wichopy/empada-testserver
  
2. npm install for all 3 repos.

3. Run 'npm start' or 'yarn start' each time in your terminal to run all 3 repos. 

4. Open up localhost:3000 to connect to the main app.

Optional: 

5. Connect to http://blooming-forest-29843.herokuapp.com/# if you do not wish to receive the taskdashboard through email. 
   Emails will be sent out to all emails added during the CREATE EVENT stage of the app. Simply follow the link to 
   open up your own task dashboard with all of your assigned tasks. You must login with the correct email in order to 
   see your list of assigned tasks. 
