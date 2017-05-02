import React from 'react';
import NewPeopleRow from './NewPeopleRow.jsx';

function EventUsersCard ({personInputsDisabled, assigned_people, selected, eventCreationSelectToggle, eventCreationDeleteUser}) {
  return (
    <div className="card-panel event-users">
      <div className="card-container">
        {personInputsDisabled()}
        <div className="collection">
          {assigned_people
            .map( (p, i) => {
              return <NewPeopleRow 
                p={p} 
                i={i} 
                selected={selected} 
                eventCreationSelectToggle={eventCreationSelectToggle} 
                eventCreationDeleteUser={eventCreationDeleteUser}
              />
            })
          }
        </div>
      </div>
    </div>
  );
}

module.exports = EventUsersCard;