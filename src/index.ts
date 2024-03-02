import express from 'express';

import router from './routers/routers.js';

const port = 3000;
const app = express();
app.use(router);

app.listen(port, () => {
  console.log('Server listening on port 3000 ...');
});
