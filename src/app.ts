import express, { Application, Request, Response } from 'express';
export interface ProcessEnv {
  [key: string]: string | undefined
}

const app: Application = express();
const ENV = process.env.NODE_ENV || "development";
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 8001;

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});


app.listen(PORT, () => console.log(`Listening on port ${PORT} in ${ENV} mode.`));