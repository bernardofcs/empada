import React, { Component } from 'react';


class Nav extends Component {
  render() {
    return (
      <nav className="nav-extended light-blue lighten-1">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo left"><i className="large material-icons">av_timer</i>EMPADA</a>
          {/*<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>*/}
          <ul id="nav-mobile" className="right">
            {this.props.profile &&
              <li className="li-img"><img src={this.props.profile.picture} className="avatar"/></li>
            }
            {this.props.profile &&
              <li>
                <a>Logged in as: {this.props.profile.email}</a>
              </li>
            }
            {this.props.profile &&
              <li><a className="btn-logout waves-effect waves-light btn btn-small green lighten-2" onClick={this.props.logout}>Log out</a></li>
            }
            {!(this.props.profile) &&
              <li>
                <a className="waves-effect waves-light btn green lighten-2" onClick={this.props.showLock}>Sign In</a>
              </li>
            }
          </ul>
        </div>

        <div className='nav-content'>
          <ul className="tabs tabs-transparent">
            <li className="tab" onClick={this.props.displayHomePage}><a href="#">Home</a></li>
            <li className="tab" onClick={this.props.displayEventCreationFormPage}><a className="active" href="#">Create Event</a></li>
            <li className="tab" onClick={this.props.displayProjectSelectionPage}><a href="#">Events</a></li>
            {Object.keys(this.props.selectedProject).length !== 0 &&
              <li className="tab" onClick={this.props.displayDashboardPage}><a href="#">{this.props.selectedProject.name}</a></li>
            }
            <li className="tab" onClick={this.props.displayTaskDashboard}><a href="#">Task Dashboard</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;