module.exports = function(sequelize, DataTypes) {
  const assigned_user = sequelize.define('assigned_user', {
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        assigned_user.belongsTo(models.User)
        assigned_user.belongsTo(models.Project)
        assigned_user.hasMany(models.task)
      }
    }
  });
  return assigned_user;
};