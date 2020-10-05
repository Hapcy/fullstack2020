import express from 'express';
import { mikroorm } from './entities';
import ormConfig from './mikro-orm.config';
import { routes } from './controllers';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use(mikroorm(ormConfig));

app.use(routes);

app.listen(3000, () => {
  console.log('Server started on PORT: 3000.');
});
