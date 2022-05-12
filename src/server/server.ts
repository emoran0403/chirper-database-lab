import * as express from "express";
import apiRouter from "./routes";
import * as path from "path";

const app = express();

app.use(express.static("public")); // send public directory to client
app.use(express.json()); // allows for req.body parsing
app.use(apiRouter); // sets up the routes

const clientPaths = ["/", "/chirps/"];

app.use(clientPaths, (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

app.use("/api/*", (req, res) => res.sendStatus(404).json({ message: "oops, bad route" }));

app.use("*", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
