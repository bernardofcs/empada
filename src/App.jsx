import React, { Component } from 'react';
import './App.css';
import Auth0Lock from 'auth0-lock'
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      modalIsOpen: false
    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  showLock = () => {
    // Show the Auth0Lock widget
    this.lock.show();
  }

  logout = () => {
    this.setState({profile: undefined})
    localStorage.removeItem("profile")
    // this.showLock()
  }

  componentWillMount = () => {
    console.log("componentWillMount <App />");
    this.lock = new Auth0Lock('TejTiGWUQtFqn8hCNABYJ1KREwuDwyat', 'bfcsiqueira.auth0.com', {
      theme: {
        primaryColor: '#26e'
      },
      languageDictionary: {
        title: 'Authenticate'
      },
      closable: false,
      additionalSignUpFields: [{
        name: "given_name",
        placeholder: "Enter your first name",
        // icon: "https://example.com/name_icon.png",
        validator: (value) => {
          return value.length > 1
        }
      },{
        name: "family_name",
        placeholder: "Enter your last name",
        // icon: "https://example.com/name_icon.png",
        validator: (value) => {
          return value.length > 1
        }
      }]
    });

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem("accessToken", authResult.accessToken);
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          console.log("Error loading the Profile", err);
          return;
        }
        localStorage.setItem("profile", JSON.stringify(profile));
        this.setState({profile: profile});
        this.handleLogin()
      });
    });
  }

  componentDidMount = () => {
    // console.log("componentDidMount <App />");
    setTimeout(() => {
      if(!localStorage.profile){
        this.showLock();
      }else{
        const storageProfile = JSON.parse(localStorage.profile)
        this.setState({profile: storageProfile})
      }
    }, 500)
    const mysocket = new WebSocket("ws://localhost:3001")
    this.socket = mysocket;

    this.socket.onopen = () => {
      console.log('Connected to server!')
    }

    // everything below this point till the next major comment is timeline related

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const tasks = [];
      const timing = ['early start', 'late start', 'as scheduled', 'completed early', 'completed late'];
      for (let key of Object.keys(data.data)) {
        const task = data.data[key];
        // console.log(`creating task bars: ${task.task_name}`);

        if (task.start_date < task.assigned_start_date
          && task.end_date < task.assigned_end_date
          && task.assigned_start_date < task.end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.assigned_start_date,
            timing[0]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.end_date,
            timing[2]

          ],
          [
            task.task_name,
            task.end_date,
            task.assigned_end_date,
            timing[3]
          ])
        } else if (task.start_date < task.assigned_start_date
          && task.end_date > task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.assigned_start_date,
            timing[0]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date,
            timing[2]
          ],
          [
            task.task_name,
            task.assigned_end_date,
            task.end_date,
            timing[4]
          ])
        } else if (task.start_date > task.assigned_start_date
          && task.end_date < task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.assigned_start_date,
            task.start_date,
            timing[1]
          ],
          [
            task.task_name,
            task.start_date,
            task.end_date,
            timing[2]
          ],
          [
            task.task_name,
            task.end_date,
            task.assigned_end_date,
            timing[3]
          ])
        } else if (task.start_date > task.assigned_start_date
          && task.end_date > task.assigned_end_date
          && task.start_date < task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.assigned_start_date,
            task.start_date,
            timing[1]
          ],
          [
            task.task_name,
            task.start_date,
            task.assigned_end_date,
            timing[2]
          ],
          [
            task.task_name,
            task.assigned_end_date,
            task.end_date,
            timing[4]
          ])
        } else if (task.end_date < task.assigned_start_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.end_date,
            timing[3]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date,
            timing[3]
          ])
        } else if (task.start_date > task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.end_date,
            timing[1]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date,
            timing[1]
          ])
        }
      };

      const colorMap = {
        // should contain a map of category -> color for every category
        'early start'     : '#139A43',
        'late start'      : '#F26430',
        'as scheduled'    : '#279AF1',
        'completed early' : '#139A43',
        'completed late'  : '#F26430'
      };
      tasks.map((arr) => {
        arr.push(colorMap[arr[3]]);
        arr[3] = `${arr[0]} - ${arr[3]}`;
      });

      if (data.type === 'tasks') {
        this.setState({'tasks': tasks});
      };
    };
  }

  handleLogin = () => {
    console.log(this.state.profile.email)
    const loginObj = {type: 'auth0-login', email:this.state.profile.email, first_name: this.state.profile.given_name, last_name: this.state.profile.family_name}
    this.socket.send(JSON.stringify(loginObj))
  }

  render() {
    const timing = ['early start', 'late start', 'as scheduled', 'completed early', 'completed late'];
    let sample_data = [
      ["Ammar", new Date(2016, 11, 1, 8,  1), new Date(2016, 11, 1, 8, 30), timing[0], '#a23c7a'],
      ["Ammar", new Date(2016, 11, 1, 8, 30), new Date(2016, 11, 1, 9,  1), timing[2], '#40a67d'],
      ["Ammar", new Date(2016, 11, 1, 9,  1), new Date(2016, 11, 1, 9, 30), timing[3], '#5581b4']
    ];
    let libraryData = {timeline: {groupByRowLabel: true}};

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to EMPADA</h2>
          <div className="login-box">
            <button onClick={this.showLock}>Sign In</button>
            <button onClick={this.logout}>Log out</button>
            {this.state.profile && <p>Logged in as: {this.state.profile.email}</p>}
          </div>
          {/*<button onClick={this.openModal}>Login</button>*/}
        </div>

        <br />
        {/*<InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />*/}
        <div className='timeline-container'>
          <div className='timeline'>
            <Timeline data={sample_data} library={libraryData} />
            <Timeline data={this.state.tasks} library={libraryData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

