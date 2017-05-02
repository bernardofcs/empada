import React from 'react';
import NewTaskRow from './NewTaskRow.jsx';
import NewTaskFields from './NewTaskFields.jsx';

function EventCreateTasksCard (props) {
  console.log(props)
  const { tasks, selected } = props.eventCreation
  const eventCreationDeleteTask = props.eventCreationDeleteTask
  return (
    <div className="card-panel event-create-tasks">
      <div className="card-container">
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            <NewTaskFields
              {...props}
            />
            {tasks
              .filter((t)=> {
                return +t.user_id === +selected.id;
              })
              .map((t,i)=> {
                return <NewTaskRow 
                        t={t} 
                        i={i} 
                        eventCreationDeleteTask={eventCreationDeleteTask}
                />
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

module.exports = EventCreateTasksCard;