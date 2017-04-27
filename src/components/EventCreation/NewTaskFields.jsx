import React from 'react';

function NewTaskFields (props) {
  //  console.log(props)
  const {newTask, newDescription, newStartTime, newEndTime, selected } = props.eventCreation
  const { onNewTask, onNewEndTime, onNewStartTime, onNewDescription } =props;
  
  if (selected.name !== ""){
    return (
      <tr>
        <td><input type="text" placeholder="New Task" value={newTask} onChange={onNewTask}/></td>
        <td><input type="text" placeholder="Description of Task" value={newDescription} onChange={onNewDescription}/></td>
        <td><input type="time" placeholder="Start Task Time" value={newStartTime} onChange={onNewStartTime}/></td>
        <td><input type="time" placeholder="End Task Time" value={newEndTime} onChange={onNewEndTime}/></td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td><input disabled type="text" placeholder="New Task" value={newTask} onChange={onNewTask}/></td>
        <td><input disabled type="text" placeholder="Description of Task" value={newDescription} onChange={onNewDescription}/></td>
        <td><input disabled type="time" placeholder="Start Task Time" value={newStartTime} onChange={onNewStartTime}/></td>
        <td><input disabled type="time" placeholder="End Task Time" value={newEndTime} onChange={onNewEndTime}/></td>
      </tr>
    );
  }

};
module.exports = NewTaskFields;