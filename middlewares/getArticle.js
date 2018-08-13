import db from '../models';

const { Article, User } = db;

const getArticle = (req, res, next) => {
  const { slug } = req.params;
  Article.findOne({
    where: {
      slug
    },
    include: [{
      model: User,
      attributes: { exclude: ['id', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
    }],
    attributes: { exclude: ['userId'] }
  })
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          success: false,
          errors: {
            body: ['The article does not exist']
          },
        });
      }
      req.articleObject = article;
      next();
    })
    .catch(next);
};

export default getArticle;
