import express from "express";
import createMembers, { deleteMember, getAllmembers, getmemberById, updateMember } from "../Controller/Member.js";

const router = express.Router()
router.route("/").post(createMembers).get(getAllmembers)
router.route("/:id")
  .get(getmemberById)
  .delete(deleteMember)
  .put(updateMember);

export default router