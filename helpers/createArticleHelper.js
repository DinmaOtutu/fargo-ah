import generateUniqueSlug from './generateUniqueSlug';
import { Article, User } from '../models';
import calculateReadTime from './calculateReadTime';

/**
 * @description an helper function to help create article in database
 * @param {object} res - response object
 * @param {object} articleObject - contains extracted article fields
 * @param {string} imageUrl - image url from cloudinary
 * @returns object - the created article from the database
 */

const createArticleHelper = (res, articleObject, imageUrl = null) => {
  const {
    title, description, body, tagList, userId, wordCount
  } = articleObject;
  const readTime = calculateReadTime(wordCount);
  return Article
    .create({
      slug: generateUniqueSlug(title),
      title,
      description,
      body,
      userId,
      tagList,
      imageUrl,
      readTime
    })
    .then(article => Article.findById(article.id, {
      include: [{
        model: User,
        attributes: { exclude: ['id', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
      }],
      attributes: { exclude: ['userId'] }
    }))
    .then(article => res.status(201).json({ article }));
};

export default createArticleHelper;
