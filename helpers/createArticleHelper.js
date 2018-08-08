import generateUniqueSlug from './generateUniqueSlug';
import { Article, User } from '../models';


/**
 * @description an helper function to help create article in database
 * @param {object} res - response object
 * @param {object} articleObject - contains extracted article fields
 * @param {string} imageUrl - image url from cloudinary
 * @returns object - the created article from the database
 */

const createArticleHelper = (res, articleObject, imageUrl = null) => {
  // articleObject.price = articleObject.price.toFixed(2);
  articleObject.price = (articleObject.price) ? articleObject.price.toFixed(2) : undefined;
  const {
    title, description, body, tagList, userId, isPaidFor, price,
  } = articleObject;
  return Article
    .create({
      slug: generateUniqueSlug(title),
      title,
      description,
      body,
      userId,
      tagList,
      imageUrl,
      isPaidFor,
      price
    })
    .then(article => Article.findById(article.id, {
      include: [{
        model: User,
        attributes: { exclude: ['id', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
      }],
      attributes: { exclude: ['id', 'userId'] }
    }))
    .then(article => res.status(201).json({ article }))
    .catch(err => res.status(400).send({
      errors: {
        body: [
          'Sorry, there was an error creating your article',
          err
        ]
      }
    }));
};

export default createArticleHelper;
