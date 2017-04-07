
# WELCOME TO EMPADA

Empada is an event management dashboard designed to keep an event manager up to date on the progress of all of their assigned users' tasks
all on one screen. It has a sleek design that negates the need for the manager to manually track tasks, and instead puts the ownace on the assigned users.

### Authentication:
![sign in with Facebook, Github or Google](https://media.giphy.com/media/3oKIPhFrwgCtvZwSVG/giphy.gif)

### Dynamically loaded timeline on task creation:
![](https://media.giphy.com/media/3ohzdQVqHHkJaw5cVG/giphy.gif)

### Event Selection and Dashboard
![](https://media.giphy.com/media/3og0Iyire6odnFdvck/giphy.gif)

### Start task and live timeline update.
![](https://media.giphy.com/media/3o7btQSKU4iYkDOE48/giphy.gif)

### End tasks to update progress bars and stop progressing.
![](https://media.giphy.com/media/l4FGFc8JdXXuD8Y1y/giphy.gif)

#### This app was created in 2 short weeks utilizing:
- [REACT.js](https://facebook.github.io/react/)
- [EXPRESS.js](https://expressjs.com/)
- [NODE.js](https://nodejs.org/en/)
- [WEBSOCKETS](https://www.websocket.org/)
- [REACT CHARTKICK.js](http://chartkick.com/)
- [MATERIALIZE](http://materializecss.com/)
- [SEQUELIZE.js](http://docs.sequelizejs.com/en/v3/)
- [POSTGRES](https://www.postgresql.org/)
- [AUTH0](https://auth0.com/docs/quickstart/spa/react)
- [MAILGUN](https://www.mailgun.com/)


#### Contributors for this project:
- [Bernardo S.](https://github.com/bernardofcs)
- [Ammar M.](https://github.com/Ammarmasud)
- [Brandon B.](https://github.com/Bbooth4)
- [Will C.](https://github.com/wichopy)

#### Features include:
  - real time updates for all app features
  - event creation page where you can add new contractors and assign them tasks for the day
    - a dynamically rendered timeline that is created as tasks are assigned to contractors
  - an event dashboard featuring:
    - progress bars to viualize each assigned users overall progress
    - a live timeline that progresses with current time for per second tracking
    - a real time newsfeed
  - a taskdashboard that shows the event manager all of the tasks they have assigned as well as whether or not they have begun or ended
  - an email is sent out to all contractors with their list of tasks for the day
  - a store listing all of the created projects, both past and present
  
#### Future Features:
  - Implement an API which allows assigned users to text or send voice clips to dashboard.
  - Automatic phone calls or text if someone is late on starting a task or to give reminders.
  - Mobile app for event dashboard.

## Setup Instructions
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
1. git clone the following repos:

    Event creation and event dashboard 
  https://github.com/bernardofcs/empada   - the one you are currently

    Runs the server for for both repos
  https://github.com/bernardofcs/empada-tasklist

    Runs the front-end for the taskdashboard sent through email
  https://github.com/wichopy/empada-testserver
  
2. npm install for all 3 repos.

3. Run 'npm start' or 'yarn start' each time in your terminal to run all 3 repos. 
    - Requires node 7, run `nvm install 7` then `nvm use 7` if you do not have it.
4. Open up localhost:3000 to connect to the main app.

Optional: 

5. Connect to http://blooming-forest-29843.herokuapp.com/# if you do not wish to receive the taskdashboard through email. 
   Emails will be sent out to all emails added during the CREATE EVENT stage of the app. Simply follow the link to 
   open up your own task dashboard with all of your assigned tasks. You must login with the correct email in order to 
   see your list of assigned tasks. 
