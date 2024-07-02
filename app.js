import express from "express";
import { dbConn } from "./database/dbConnection.js";
import bookRouter from "./src/modules/Book/book.routes.js";
import authorRouter from "./src/modules/author/author.routes.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(port, () => console.log(`server is running...`));