'use strict';
module.exports = function(sequelize, DataTypes) {
  var project = sequelize.define('project', {
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Project.hasMany(models.assigned_user)
        Project.hasMany(models.manager_user)
        Project.hasMany(models.task)
      }
    }
  });
  return project;
};