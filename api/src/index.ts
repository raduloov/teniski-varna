import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const { SPEEDY_USERNAME, SPEEDY_PASSWORD } = process.env;

app.get("/", async (req: Request, res: Response) => {
  const response = await fetch(
    `https://api.speedy.bg/v1/location/office?userName=${SPEEDY_USERNAME}&password=${SPEEDY_PASSWORD}&countryId=100`
  );
  const data = await response.json();
  res.json(data);
});

const port = process.env.API_PORT_DEV;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
