import Express from 'express';

export const timeMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const uri = req.originalUrl;
  const now = new Date();
  next();
  const elapsed = new Date().getTime() - now.getTime();
  console.log(`Request ${uri} took: ${elapsed}ms`);
};
