import Express from 'express';

export const pong = (req: Express.Request, resp: Express.Response) => {
  resp.send('pong');
};
