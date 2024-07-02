import { Router } from "express";
import {
  allBooks,
  createBook,
  deleteBook,
  specificBook,
  updateBook,
} from "./book.controller.js";

const bookRouter = Router();
bookRouter.post("/", createBook);
bookRouter.get("/", allBooks);
bookRouter.get("/:id", specificBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
