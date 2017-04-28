import React from 'react';

function Nav(props){
  const { profile, logout, showLock, displayHomePage, displayEventCreationFormPage, displayProjectSelectionPage, selectedProject, displayDashboardPage, displayTaskDashboard} = props;
  return (
    <nav className="nav-extended light-blue lighten-1">
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo left"><i className="large material-icons">av_timer</i>EMPADA</a>
        {/*<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>*/}
        <ul id="nav-mobile" className="right">
          {profile &&
            <li className="li-img"><img src={profile.picture} className="avatar" alt="avatar"/></li>
          }
          {profile &&
            <li>
              <a>Logged in as: {profile.email}</a>
            </li>
          }
          {profile &&
            <li><a className="btn-logout waves-effect waves-light btn btn-small green lighten-2" onClick={logout}>Log out</a></li>
          }
          {!(profile) &&
            <li>
              <a className="waves-effect waves-light btn green lighten-2" onClick={showLock}>Sign In</a>
            </li>
          }
        </ul>
      </div>
      <div className='nav-content'>
        <ul className="tabs tabs-transparent">
          <li className="tab" onClick={displayHomePage}><a href="#">Home</a></li>
          <li className="tab" onClick={displayEventCreationFormPage}><a className="active" href="#">Create Event</a></li>
          <li className="tab" onClick={displayProjectSelectionPage}><a href="#">Events</a></li>
          {Object.keys(selectedProject).length !== 0 &&
            <li className="tab" onClick={displayDashboardPage}><a href="#">{selectedProject.name}</a></li>
          }
          <li className="tab" onClick={displayTaskDashboard}><a href="#">Task Dashboard</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;