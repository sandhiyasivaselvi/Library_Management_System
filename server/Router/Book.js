import express from "express";
import createBooks, { deleteBook, getAllbooks, getbookById, updateBook} from "../Controller/Book.js"

const router = express.Router()
router.route("/").post(createBooks).get(getAllbooks)
router.route("/:id")
  .get(getbookById)
  .delete(deleteBook)
  .put(updateBook);

export default router