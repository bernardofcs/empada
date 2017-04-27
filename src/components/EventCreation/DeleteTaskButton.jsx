// delete button reference: http://stackoverflow.com/questions/40415846/remove-table-row-after-onclick-in-react-component
import React from 'react';

class DeleteTaskButton extends React.Component{
  onClick = (e) => {
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
  }

  render () {
    return(
      <span className="right waves-effect waves-light btn-small btn red lighten-1" onClick={ (e) => this.onClick(e) }>
        <i className="small material-icons" >delete</i>
      </span>
    )
  }
};
module.exports = DeleteTaskButton;
