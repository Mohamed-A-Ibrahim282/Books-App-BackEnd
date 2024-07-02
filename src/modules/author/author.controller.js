import { Author } from "../../../database/models/author.model.js";
import { Book } from "../../../database/models/book.model.js";

const addAuthor = async (req, res) => {
  const createAuthor = await Author.insertMany(req.body);
  res.status(201).json({ message: "Added", author: createAuthor });
};

const getAllAuthors = async (req, res) => {
  const query = {};

  if (req.query.name) {
    query.name = new RegExp(req.query.name, "i");
  }
  if (req.query.bio) {
    query.bio = new RegExp(req.query.bio, "i");
  }
  const authors = await Author.find(query).populate("books");
  res.status(200).json({ message: "All Authors", authors });
};

const getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id).populate("books");

  if (!author) return res.status(401).json({ message: "author not found" });

  res.status(200).json({ message: "author details", author });
};

const updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("books");

  if (!author) return res.status(401).json({ message: "author not found" });

  res.status(200).json({ message: "updated", author });
};

const deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id).populate(
    "books"
  );
  if (!author) return res.status(404).json({ message: "author not found" });

  await Book.updateMany({ author: author._id }, { $unset: { author: "" } });

  res.status(200).json({ message: "Deleted" });
};

export { addAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor };
