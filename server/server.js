
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns/promises";
import Booksrouter from "./Router/Book.js"
import Membersrouter from "./Router/Member.js"
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();


import connectedDb from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());


connectedDb();

app.get("/", (req, res) => {
  res.status(200).json("Server Running Successfully");
});

app.use("/api/books", Booksrouter)
app.use("/api/members", Membersrouter)

const port = process.env.PORT; 
app.listen(port, () => {
  console.log("Server Running on", port);
});