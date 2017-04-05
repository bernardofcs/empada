import React from 'react';

function AddNewPersonButton (props) {
  let disabled = "";
  if (props.eventCreation.newAssignedPerson === ""
    || props.eventCreation.name === ""
    || props.eventCreation.startDate === ""){
    disabled = "disabled"
  }
  return (
    <a
      className={`${disabled} btn-floating halfway-fab waves-effect waves-light btn green lighten-2`}
      onClick={props.addNewAssignedUser}>
        {/*Add { props.eventCreation.newAssignedPerson} to your event!*/}
        <i className="material-icons">add</i>
    </a>
  );
};

module.exports = AddNewPersonButton;