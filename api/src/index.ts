import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import speedy from './routes/speedy';
import myPos from './routes/myPos';
import mailgun from './routes/mailgun';
import { API_PORT_DEV } from './config';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/mailgun', mailgun);
app.use('/speedy', speedy);
app.use('/myPos', myPos);

const port = API_PORT_DEV;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
