'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    project_id: DataTypes.INTEGER,
    task_name: DataTypes.STRING,
    task_description: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Task.belongsTo(models.Project)
      }
    }
  });
  return Task;
};