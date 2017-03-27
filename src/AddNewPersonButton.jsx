import React from 'react';

function AddNewPersonButton (props) {
  //  console.log(props)
  if (props.eventCreation.newAssignedPerson !== ""){
    return ( 
      <button 
        className="waves-effect waves-light btn-large" 
        onClick={props.addNewAssignedUser}>
          Add {props.eventCreation.newAssignedPerson} to your event!
      </button>
    );
  }
  return <div></div>
};

module.exports = AddNewPersonButton;