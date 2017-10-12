'use strict';
module.exports = (sequelize, DataTypes) => {
  var Respond = sequelize.define('Respond', {
    IssueId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    respond: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Respond.associate = function (models) {
    //Respond.belongsToMany(models.User);
    Respond.belongsTo(models.Issue);
    Respond.belongsTo(models.User)
  };

  return Respond;
};
