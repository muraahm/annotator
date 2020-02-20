"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const shell = __importStar(require("shelljs"));
const path_1 = __importDefault(require("path"));
// Copy all the view templates
shell.cp("-R", "src/views", "dist/");
const app = express_1.default();
const ENV = process.env.NODE_ENV || "development";
const PORT = parseInt(`${process.env.PORT}`, 10) || 8001;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "views")));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/views" });
});
app.post("/submit", (req, res) => {
    const imageName = req.body.imageName;
    const annotations = req.body.annotations;
    const result = {
        imageName,
        annotations
    };
    console.log(result);
    res.json(result);
});
app.listen(PORT, () => console.log(`Listening on port ${PORT} in ${ENV} mode.`));
