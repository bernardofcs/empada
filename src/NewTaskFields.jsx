import React from 'react';

function NewTaskFields (props) {
  //  console.log(props)
  if (props.eventCreation.selected.name !== ""){
    return ( 

      <tr>
        <td><input type="text" placeholder="New task" value={props.eventCreation.newTask} onChange={props.functions.onNewTask}/></td>
        <td><input type="text" placeholder="Description of task" value={props.eventCreation.newDescription} onChange={props.functions.onNewDescription}/></td>
        <td><input type="time" placeholder="Start Task time" value={props.eventCreation.newStartTime} onChange={props.functions.onNewStartTime}/></td>
        <td><input type="time" placeholder="End Task Time" value={props.eventCreation.newEndTime} onChange={props.functions.onNewEndTime}/></td>
      </tr>

    );
  }

  return <tr><td colSpan="4"><h5>Select an assigned person</h5></td></tr>
};
module.exports = NewTaskFields;