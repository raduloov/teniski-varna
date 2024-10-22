import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import speedy from './routes/speedy';
import myPos from './routes/myPos';

dotenv.config();

const app = express();

app.use(cors());

app.use('/speedy', speedy);
app.use('/myPos', myPos);

const port = process.env.API_PORT_DEV;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
