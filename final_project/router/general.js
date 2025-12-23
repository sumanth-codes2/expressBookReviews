const express = require('express');
const axios = require('axios');
const public_users = express.Router();

// Get all books
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book details by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/`);
    const book = response.data[req.params.isbn];
    book ? res.json(book) : res.status(404).json({ message: "Book not found" });
  } catch {
    res.status(500).json({ message: "Error fetching book" });
  }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/`);
    const result = Object.values(response.data).filter(
      book => book.author === req.params.author
    );
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/`);
    const result = Object.values(response.data).filter(
      book => book.title === req.params.title
    );
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/`);
    const reviews = response.data[req.params.isbn]?.reviews;
    res.json(reviews || {});
  } catch {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports.general = public_users;
