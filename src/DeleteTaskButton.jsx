// delete button reference: http://stackoverflow.com/questions/40415846/remove-table-row-after-onclick-in-react-component
import React from 'react';

const DeleteTaskButton = React.createClass({
  onClick: function(e) {
    e.stopPropagation();
    this.props.eventCreationDeleteTask(this.props.index);
    // $.ajax({
    //   data: {email_address: email },
    //   url: '/delete-contact',
    //   dataType: 'html',
    //   type: "POST",
    //   success: function(data, status, xhr) {
    //     $('.delete-success').slideDown(400);
    //     setTimeout(function() { $(".delete-success").slideUp(400); }, 5000);
    //   }
    // });
  },
  render: function(){
    return(
      <button 
        className="right-align" 
        onClick={(e) => this.onClick(e) }>
        <i className="tiny material-icons" >delete</i>
      </button>
    )
  }
});
module.exports = DeleteTaskButton;
