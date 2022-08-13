import { stripHtml } from 'string-strip-html';

export const sanitizeDatas = (req, _res, next) => {
  if (!req.body) next();

  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = stripHtml(req.body[key]).result.trim();
    }
  });

  next();
};
