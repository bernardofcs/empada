import React from 'react';

function NewTaskFields (props) {
   console.log(props)
  if (props.eventCreation.selected.name !== ""){
    return ( 

      <tr>
        <td><input type="text" placeholder="New task" value={props.eventCreation.newTask} onChange={props.functions.newTask}/></td>
        <td><input type="text" placeholder="Description of task" value={props.eventCreation.newDescription} onChange={props.functions.newDescription}/></td>
        <td><input type="time" placeholder="Start Task time" value={props.eventCreation.newStartTime} onChange={props.functions.newStartTime}/></td>
        <td><input type="time" placeholder="End Task Time" value={props.eventCreation.newEndTime} onChange={props.functions.newEndTime}/></td>
      </tr>

    );
  }

  return <tr><h5>Select an assigned person</h5></tr>
};
module.exports = NewTaskFields;