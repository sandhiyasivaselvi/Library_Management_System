import Book from "../Model/Book.js";


const createBooks = async (req, res) => {
  try {
    console.log("Category received:", req.body.category);
    const { title, author, isbn, noc, category, year } = req.body;

    const book = await Book.create({
      title,
      author,
      isbn,
      noc,
      category,
      year,
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export default createBooks

export const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getbookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book fetched successfully by ID",
      data: book,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found, cannot delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found, cannot update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};