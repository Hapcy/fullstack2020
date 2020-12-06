import * as path from 'path';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://fullstack-2020-21-1-ts.herokuapp.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

app.use(express.static('./dist/issue-tracker-client'));

app.use('*', (req, res) => {
  res.sendFile(path.resolve('./dist/issue-tracker-client/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
