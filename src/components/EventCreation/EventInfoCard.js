import React from 'react';

function EventInfoCard ({name,description,startDate,endDate,updateEventState}) {
  return (
    <div className="card-panel event-info">
      <div className="card-container">
        Event Name:
          <input type="text" placeholder="THE MAIN EVENT!" value={name} name='name' onChange={updateEventState} />
        Event Description:
          <input type="text" placeholder="Describe your event here" value={description} name='description' onChange={updateEventState}/>
        Event Start Date:
          <input type="date" placeholder="2017/01/01" value={startDate} name='startDate' onChange={updateEventState}/>
        Event End Date:
          <input type="date" placeholder="2017/01/01" value={endDate} name='endDate' onChange={updateEventState}/>
      </div>
    </div>
  );
}

module.exports = EventInfoCard;