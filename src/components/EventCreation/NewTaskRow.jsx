import React from 'react';
import DeleteTaskButton from './DeleteTaskButton.jsx'

function NewTaskRow (props) {
    const {t, i, eventCreationDeleteTask} = props;
    return (
        <tr key={i}>
            <td data-task-id={t.id}>{t.name}</td>
            <td data-task-id={t.id}>{t.description}</td>
            <td data-task-id={t.id}>{t.assigned_start_time}</td>
            <td data-task-id={t.id}>{t.assigned_end_time}</td>
            <td>
                <DeleteTaskButton
                eventCreationDeleteTask={eventCreationDeleteTask}
                index={i}
                />
            </td>
        </tr>
    )
}

module.exports = NewTaskRow;