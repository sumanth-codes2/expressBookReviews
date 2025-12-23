const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get all books
public_users.get('/', async (req, res) => {
  res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  let result = {};

  Object.keys(books).forEach(key => {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  });

  res.status(200).json(result);
});

// Get book details based on title
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  let result = {};

  Object.keys(books).forEach(key => {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  });

  res.status(200).json(result);
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
