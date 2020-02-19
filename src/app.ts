import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
export interface ProcessEnv {
  [key: string]: string | undefined;
}

const app: Application = express();
const ENV: string = process.env.NODE_ENV || "development";
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 8001;

app.use(express.json());
app.use(express.static("../library"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/submit", (req: Request, res: Response) => {

  class Result {
    imageName: string = req.body.imageName;
    annotations: {
      annotationID: string;
      upperLeft: { pointID: string; position: [number, number] };
      lowerRight: { pointID: string; position: [number, number] };
      type: string;
    }[] = req.body.annotations;
};

const result = new Result;

  res.json(result);
});

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT} in ${ENV} mode.`)
);
