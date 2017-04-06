import React, { Component } from 'react';

class ProjectSelection extends Component {
  render() {
    return (
      <div className="card-panel">
        <div className="collection">
          {this.props.currentUserProjects.map( (p, i) => {
            return (
              <a
                key={p.id}
                href="#!"
                data-id={p.id}
                className={
                  +this.props.selectedProject.id === +p.id ?
                    "collection-item active" :
                    "collection-item"
                }
                onClick={this.props.selectProject}>
                {p.name}
              </a>
              );
            })}
          </div>
      </div>
    );
  }
}

export default ProjectSelection;