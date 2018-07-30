
module.exports = (sequelize) => {
  const Like = sequelize.define('Like', {}, {});

  Like.associate = (models) => {
    Like.belongsTo(models.Article, {
      foreignKey: 'articleId',
    });
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Like;
};
