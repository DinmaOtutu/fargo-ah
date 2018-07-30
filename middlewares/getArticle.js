import db from '../models';

const { Article, User, Like } = db;
const getArticle = (req, res, next) => {
  const { slug } = req.params;

  Article
    .findOne({
      include: [{
        model: Like,
        as: 'likes',
        include: {
          model: User,
          attributes: { exclude: ['id', 'hashedPassword', 'createdAt', 'updatedAt'] }
        }
      }],
      attributes: { exclude: ['userId'] },
      where: { slug, },
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
    .catch(() => res.status(404).json({
      success: false,
      errors: {
        body: ['The article does not exist']
      },
    }));
};

export default getArticle;
