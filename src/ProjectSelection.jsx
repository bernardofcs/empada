import React, { Component } from 'react';

class ProjectSelection extends Component {
  render() {
    const { currentUserProjects, selectedProject, selectProject } = this.props;
    return (
      <div className="card-panel">
        <div className="collection">
          {currentUserProjects.map( (p, i) => {
            return (
              <a
                key={p.id}
                href="#!"
                data-id={p.id}
                className={
                  +selectedProject.id === +p.id ?
                    "collection-item active" :
                    "collection-item"
                }
                onClick={selectProject}>
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