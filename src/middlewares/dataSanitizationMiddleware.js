import { stripHtml } from 'string-strip-html';

const sanitizeDatas = (req, _res, next) => {
  if (!req.body) return next();

  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = stripHtml(req.body[key]).result.trim();
    }
  });

  return next();
};

export default sanitizeDatas;
