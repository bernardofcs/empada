  import React from 'react';
  
  function NewTaskFields (props) {
     console.log(props)
    if (props.selected.name !== ""){
      return ( 
       
        <tr>
          <td><form><input type="text" placeholder="New task" value={props.newTask} onChange={props.functions.newTask}/></form></td>
          <td><form><input type="text" placeholder="Description of task" value={props.newDescription} onChange={props.functions.newDescription}/></form></td>
          <td><form><input type="time" placeholder="Start Task time" value={props.newStartTime} onChange={props.functions.newStartTime}/></form></td>
          <td><form><input type="time" placeholder="End Task Time" value={props.newEndTime} onChange={props.functions.newEndTime}/></form></td>
        </tr>
      );
    }

    return <tr><h5>Select an assigned person</h5></tr>
  };
module.exports = NewTaskFields;