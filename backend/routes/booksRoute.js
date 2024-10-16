import express from 'express'
import { Book } from "../models/bookmodel.js"

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send({ message: "Send all required fields!" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.send(book);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send({ message: "Send all required fields!" });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.send({ message: "Book Not Found!" });
    }

    return res.send({ message: "Book Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const del = await Book.findByIdAndDelete(id);

  if (!del) {
    return res.send({ message: "Book Not Found!" });
  }

  return res.send({ message: "Book Deleted Successfully!" });
});

export default router;