import React from 'react';
import DeletePersonButton from './DeletePersonButton.jsx'

function NewPeopleRow (props) {
  const {eventCreationSelectToggle, eventCreationDeleteUser, i, p, selected} = props

  return (
    <a
      key={p.id}
      href="#!"
      data-id={p.id}
      className={
        +selected.id === +p.id ?
        "collection-item active green lighten-2" :
        "collection-item"
      }
      onClick={eventCreationSelectToggle}>
      {p.name} ({p.email})
      <DeletePersonButton
        eventCreationDeleteUser={eventCreationDeleteUser}
        index={i}
      />
    </a>
  )
}

module.exports = NewPeopleRow;