import React from 'react';

function NewTaskFields (props) {
  //  console.log(props)
  if (props.eventCreation.selected.name !== ""){
    return (
      <tr>
        <td><input type="text" placeholder="New Task" value={props.eventCreation.newTask} onChange={props.functions.onNewTask}/></td>
        <td><input type="text" placeholder="Description of Task" value={props.eventCreation.newDescription} onChange={props.functions.onNewDescription}/></td>
        <td><input type="time" placeholder="Start Task Time" value={props.eventCreation.newStartTime} onChange={props.functions.onNewStartTime}/></td>
        <td><input type="time" placeholder="End Task Time" value={props.eventCreation.newEndTime} onChange={props.functions.onNewEndTime}/></td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td><input disabled type="text" placeholder="New Task" value={props.eventCreation.newTask} onChange={props.functions.onNewTask}/></td>
        <td><input disabled type="text" placeholder="Description of Task" value={props.eventCreation.newDescription} onChange={props.functions.onNewDescription}/></td>
        <td><input disabled type="time" placeholder="Start Task Time" value={props.eventCreation.newStartTime} onChange={props.functions.onNewStartTime}/></td>
        <td><input disabled type="time" placeholder="End Task Time" value={props.eventCreation.newEndTime} onChange={props.functions.onNewEndTime}/></td>
      </tr>
    );
  }

};
module.exports = NewTaskFields;