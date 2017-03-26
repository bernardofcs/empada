import React, { Component } from 'react';
import './App.css';

class EventCreationForm extends Component {
  
  toggle(e) {
    console.log(e.target.className);

    // "collection-item active" ? "collection-item" : "collection-item active";
    if (e.target.className == "collection-item active"){
      e.target.className = "collection-item";
    } else {
    e.target.className="collection-item active";
    }
  } 
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s4">
            <div className="card-panel">
            <form onSubmit={this.props.handleSubmit}>
              <input type="text" onChange={this.props.handleNameChange} placeholder="THE MAIN EVENT!" ref="insert" />
              <input type="text" onChange={this.props.handleDescChange} placeholder="Descript your event here" />
              <input type="date" onChange={this.props.handleDateChange} placeholder="2017/01/01" />
              <input type="text" onChange={this.props.handleAssignedPerson} placeholder="Bob,Jim,Sally..." />
              <input type="submit"/>
            </form>
            </div>
            <div className="card-panel">
              <div className="collection">
                
                  {this.props.assigned_people.map( (p) => {
                    return (<a href="#!" className="collection-item" onClick={this.toggle}>{p}</a>);
                  })}
                
              </div>
            </div>
          </div>
          <div className="col s8">
            <div className="card-panel">
              <table>
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><form><input type="text"/></form></td>
                    <td><form><input type="text"/></form></td>
                    <td><form><input type="text"/></form></td>
                    <td><form><input type="text"/></form></td>
                  </tr>
                  <tr>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>12:00</td>
                    <td>14:00</td>
                  </tr>
                  <tr>
                    <td>Alan</td>
                    <td>Jellybean</td>
                    <td>16:00</td>
                    <td>19:00</td>
                  </tr>
                  <tr>
                    <td>Jonathan</td>
                    <td>Lollipop</td>
                    <td>21:00</td>
                    <td>24:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default EventCreationForm;