import React from 'react';

function NewTaskFields (props) {
  //  console.log(props)
  const {newTask, newDescription, newStartTime, newEndTime, selected } = props.eventCreation
  const { updateEventState } = props;
  
  if (selected.name !== ""){
    return (
      <tr>
        <td><input type="text" placeholder="New Task" value={newTask} name='newTask' onChange={updateEventState}/></td>
        <td><input type="text" placeholder="Description of Task" value={newDescription} name='newDescription' onChange={updateEventState}/></td>
        <td><input type="time" placeholder="Start Task Time" value={newStartTime} name='newStartTime' onChange={updateEventState}/></td>
        <td><input type="time" placeholder="End Task Time" value={newEndTime} name='newEndTime' onChange={updateEventState}/></td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td><input disabled type="text" placeholder="New Task" value={newTask}  name='newTask' onChange={updateEventState}/></td>
        <td><input disabled type="text" placeholder="Description of Task" value={newDescription} name='newDescription' onChange={updateEventState}/></td>
        <td><input disabled type="time" placeholder="Start Task Time" value={newStartTime}  name='newStartTime' onChange={updateEventState}/></td>
        <td><input disabled type="time" placeholder="End Task Time" value={newEndTime}  name='newEndTime' onChange={updateEventState}/></td>
      </tr>
    );
  }

};
module.exports = NewTaskFields;