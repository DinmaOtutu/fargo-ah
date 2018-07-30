import db from '../models';
import utils from '../helpers/utilities';
import validateComment from '../helpers/validateComment';
import { replyNotifier, commentNotifier } from '../helpers/commentNotification';


const { Comment, User, Reply } = db;

/** * Class representing comments */
export default class CommentsController {
  /**
   * @function createComment
   * @summary Allows a user create comment
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} status code 201 with comment created if successful
   */
  static createComment(req, res) {
    const validator = validateComment(req);
    if (validator.length !== 0) {
      return res.status(403).json({
        success: false,
        errors: {
          body: [...validator]
        }
      });
    }
    const { body } = req.body.comment;
    Comment.create({
      userId: req.userId,
      articleId: req.articleObject.id,
      body
    })
      .then((comment) => {
        const commentDetails = {
          success: true,
          comment,
          user: utils.userToJson(req.userObject),
          article: req.articleObject,
        };
        // send email notification to the users
        commentNotifier(commentDetails);

        return res.status(201).json(commentDetails);
      })
      .catch(err => res.status(500).json({
        success: false,
        errors: {
          body: [err.message]
        },
      }));
  }

  /**
   * @function createReply
   * @summary Allows a user create comment
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} status code 201 with comment created if successful
   */
  static createReply(req, res) {
    const validator = validateComment(req);
    if (validator.length !== 0) {
      return res.status(403).json({
        success: false,
        errors: {
          body: [...validator]
        }
      });
    }
    const { body } = req.body.comment;
    Reply.create({
      userId: req.userId,
      commentId: req.params.id,
      body,
    })
      .then((reply) => {
        const replyData = {
          success: true,
          reply,
          user: utils.userToJson(req.userObject),
          comment: req.commentObject,
        };
        // send notification for reply
        replyNotifier(replyData);

        return res.status(201).json(replyData);
      })
      .catch(err => res.status(500).json({
        success: false,
        errors: {
          body: [err.message]
        },
      }));
  }

  /**
   * @function getComments
   * @summary Get a single comment, the user and article related to it
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} status code 200 with comment if successful
   */
  static getComments(req, res) {
    Comment.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['id', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
      }, {
        model: Reply,
      }],
    }, {
      where: {
        articleId: req.articleObject.id,
      }
    })
      .then(comments => res.status(200).json({
        success: true,
        article: req.articleObject,
        comments,
      }));
  }

  /**
   * @function deleteComment
   * @summary Delete a single comment
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} status code 200 if successful
   */
  static deleteComment(req, res) {
    Comment.destroy({
      where: {
        id: req.params.id,
      }
    })
      .then(() => res.status(200).json({
        success: true,
        message: {
          body: ['Comment deleted successfully']
        }
      }));
  }
}
