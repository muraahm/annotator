import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import * as shell from "shelljs";
import path from "path";
export interface ProcessEnv {
  [key: string]: string | undefined;
}

// Copy all the view templates
shell.cp("-R", "src/views", "dist/");

const app: Application = express();
const ENV: string = process.env.NODE_ENV || "development";
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 8001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: __dirname + "/views" });
});

app.post("/submit", (req: Request, res: Response) => {
  const imageName: string = req.body.imageName;
  const annotations: {
    annotationID: string;
    upperLeft: { pointID: string; position: [number, number] };
    lowerRight: { pointID: string; position: [number, number] };
    type: string;
  }[] = req.body.annotations;

  const result = {
    imageName,
    annotations
  };
  console.log(result);
  res.json(result);
});

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT} in ${ENV} mode.`)
);
