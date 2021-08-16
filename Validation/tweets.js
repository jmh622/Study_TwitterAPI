import { body, param, validationResult } from 'express-validator';

class TweetValidation {
  static validateParamId = param('id')
    .trim()
    .isEmpty()
    .withMessage('id는 빈 값이 허용되지 않습니다.')
    .isInt()
    .withMessage('id는 Number형만 가능합니다.');
  static validateBodyText = body('text').trim().isLength({ min: 2 }).withMessage('text는 최소 2자입니다.');

  static validateBodyUsername = body('username').trim().isLength({ min: 2, max: 10 }).withMessage('username은 최소 2자, 최대 10자입니다.');

  static validateEnd = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ message: errors.array() });
  };

  static create = [this.validateBodyText, this.validateBodyUsername, this.validateEnd];
  static update = [this.validateBodyText, this.validateParamId, this.validateEnd];
  static delete = [this.validateParamId, this.validateEnd];
}

export default TweetValidation;
