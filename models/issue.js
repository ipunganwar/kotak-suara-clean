'use strict';
const models = require('../models');
module.exports = (sequelize, DataTypes) => {
  var Issue = sequelize.define('Issue', {
    GovermentId: DataTypes.STRING,
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Issue.associate = function (models) {
    Issue.belongsToMany(models.User, {through:models.Respond});
    Issue.hasMany(models.Respond);
    Issue.belongsTo(models.Goverment)
    Issue.hasMany(models.VoteIssue)
  };

  Issue.prototype.voteCount = function(){
    return new Promise((resolve, reject)=>{
      
    })
  }

  return Issue;
};
