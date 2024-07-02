import { Author } from "../../../database/models/author.model.js";
import { Book } from "../../../database/models/book.model.js";

const createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  await Author.findByIdAndUpdate(book.author, { $push: { books: book._id } });
  res.status(201).json({ message: "added", book });
};

const allBooks = async (req, res) => {
  const query = {};

  if (req.query.title) {
    query.title = new RegExp(req.query.title, "i");
  }

  if (req.query.author) {
    query.author = new RegExp(req.query.author, "i");
  }
  const books = await Book.find(query).populate("author", "name -_id");

  res.status(200).json({ message: "all books", books });
};

const specificBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "author",
    "name -_id"
  );

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.status(200).json({ message: "Founded", book });
};

const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("author");

  if (!book) return res.status(400).json({ message: "Book not found" });

  res.status(200).json({ message: "updated", book });
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) return res.status(400).json({ message: "Book not found" });

  await Author.findByIdAndUpdate(book.author, { $pull: { books: book._id } });

  res.status(200).json({ message: "Book Deleted" });
};

export { createBook, allBooks, specificBook, updateBook, deleteBook };
